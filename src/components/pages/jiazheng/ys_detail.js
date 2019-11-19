import React, { Component } from 'react'
import Header from '../../common/header/header'
import img from '../../../static/img/ys.png'
import { Tag, message, Button, Icon } from 'antd';
import img2 from '../../../static/img/shui.png'
import img3 from '../../../static/img/touxiang.png'
import './ys_detail.css'
class ysDetail extends Component {
    constructor() {
        super()
        this.state = {
            title: '王语嫣',
            el: '',
            price: '',
            lens:''
        }
    }
    componentWillMount() {
        this.$http({
            url: '/findHomeWorker',
            method: 'get',
            params: {
                id: this.props.match.params.id
            }
        }).then(d => {
            console.log(d);
            if (d.data.code === -1) {
                this.props.history.push('/login')
                return message.error(d.data.info);
            }
            if (d.data.code === 0) {
                this.setState({
                    el: d.data.data[0],
                    price:d.data.data[0].price.substring(0,3),
                    lens:d.data.data[0].len.substring(0,3)
                })
            }
        })
    }
    render() {
        return (
            <div>
                <Header title={this.state.title}></Header>
                <div className="ys_des">
                    <div className="hd_des">
                        <img src={this.state.el.img} alt="" />
                        <div className="hd_right">
                            <span>{this.state.el.name}<Tag color="green">{this.state.el.vNum}</Tag></span>
                            <p>{this.state.el.city} | {this.state.el.age} | {this.state.el.edu} | {this.state.el.year}年经营</p>
                            <em><Button type="primary" className="ys_focus">关注</Button><Button type="primary">向TA提问</Button></em>
                            <p className="ys_price"><span className="d_price">￥{this.state.price}</span>/小时</p>
                            <div className="des_footer">
                                <span className="ys_focus"><Icon type="eye" theme="twoTone" />关注{this.state.el.readNum}</span>
                                <span><Icon type="heart" theme="twoTone" />好评{this.state.el.likeNum}</span>
                                <span className="ys_locate"><Icon type="environment" theme="twoTone" />距你{this.state.lens}公里</span>
                            </div>
                        </div>

                    </div>
                    <div className="description">
                        <p className="descript">简介</p>
                        <div className="classify">
                            <div><strong>资格认证</strong> : <Icon type="safety-certificate" theme="twoTone" />身份证<Icon type="safety-certificate" theme="twoTone" />学位证<Icon type="safety-certificate" theme="twoTone" />教师资格证</div>
                            <div><strong>服务项目</strong> : 钟点工、保姆、育婴师</div>
                            <div className="self_comment">
                                <strong>自我评价</strong> : 干净利落，形象好，有爱心，责任心
                            </div>
                            <span className="detail_des">曾辉毕业于河北师范大学，资深的数学高级教师，毕业于师范大学，曾经带过两届高三班，讲课细致耐心学生都很喜欢他的课...</span>
                        </div>
                    </div>
                    <div className="w_comment">
                        <div className="c_hd">
                            <p>TA们都在说</p>
                            <span><Icon type="edit" />写评论</span>
                        </div>
                        <div>
                            {/* {this.state.arr} */}
                            <div className="com_detail">
                                <img src={img2} alt="" />
                                <div className="content">
                                    <div className="con_hd">
                                        <p>娃娃脸</p>
                                        <span>1小时前</span>
                                    </div>
                                    <div className="detail_con">这家水店服务特别好，送水速度快，水喝着也不错，而且经济实惠</div>
                                </div>
                            </div>
                            <div className="com_detail">
                                <img src={img3} alt="" />
                                <div className="content">
                                    <div className="con_hd">
                                        <p>娃娃脸</p>
                                        <span>1小时前</span>
                                    </div>
                                    <div className="detail_con">这家水店服务特别好，送水速度快，水喝着也不错，而且经济实惠</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
export default ysDetail