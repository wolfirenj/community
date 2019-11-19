import React, { Component } from 'react'
import Header from '../../common/header/header'
import img from '../../../static/img/shui.png'
import img1 from '../../../static/img/touxiang.png'
import { Icon, Rate, message } from 'antd';
import './detail.css'
class detail extends Component {
    constructor() {
        super()
        this.state = {
            title: '详细',
            el: {},
            arr: '',
            isopticy: false,
            value: ''
            // isFabu : false,
            // content:'',
            // comment:[]
        }
    }
    componentWillMount() {
        this.$http({
            url: '/findWater',
            method: 'get',
            params: {
                id: this.props.match.params.id
            }
        }).then(d => {
            console.log(d)
            this.setState({
                el: d.data.data[0]
            })
        })

        this.$http({
            url: '/findComment',
            method: 'get',
            params: {
                waterId: this.props.match.params.id
            }
        }).then(d => {
            console.log(d)
            // if(d.data.code===-1){
            //     this.props.history.push('/login')
            //     return message.error(d.data.info);
            // }
            // if(d.data.code===0){
            this.setState({
                arr: d.data.data.map(item => {
                    return <div className="com_detail" key={item.id}>
                        <img src={item.ava} alt="" />
                        <div className="content">
                            <div className="con_hd">
                                <p>{item.name}</p>
                                <span>{this.transTime(item.time)}</span>
                            </div>
                            <div className="detail_con">{item.content}</div>
                        </div>
                    </div>
                })
            })
            // }else{
            //     return message.error(d.data.info)
            // }
        })
    }
    // 转换时间
    transTime(t) {
        var date = new Date(parseInt(t))
        return date.toLocaleString()
    }

    // willfabu(){
    //     this.state.isFabu=true
    // }
    showipt() {
        this.setState({
            isopticy: !this.state.isopticy
        })
    }
    change(e) {
        this.setState({
            value: e.target.value
        })
    }
    punlun(e) {
        if (e.keyCode === 13) {
            var date = new Date().getTime();
            console.log(13,localStorage.getItem("username"),this.props.match.params.id,this.state.value,date)
            
            this.$http({
                url: "/addComment",
                method: "get",
                params: {
                    username: localStorage.getItem("username"),
                    waterId: this.props.match.params.id,
                    content: this.state.value,
                    time: date
                }
            }).then(d => {
                console.log(d)
                
            })
        }
    }
    render() {
        var val = Number(this.state.el.score)
        // console.log(this.state.el.price)
        return (
            <div className='list'>
                <Header title={this.state.title}></Header>
                <div className="main">
                    <div className="hd_main">
                        <img src={this.state.el.img} alt="" />
                        <div className="content">
                            <h3>{this.state.el.name}</h3>
                            <div>
                                <Rate value={val} className="comment" />
                                <span className="sell">月售{this.state.el.count}桶</span>
                            </div>
                            <p><span className="price">￥40/</span>桶</p>
                            <div className="like">
                                <span><Icon type="like" />{this.state.el.likeNum}</span>
                                <span>&nbsp;&nbsp;浏览数 : {this.state.el.readNum}</span>
                            </div>
                        </div>
                    </div>
                    <div className="w_gps">
                        <div className="g_left">
                            <p><Icon type="environment" />{this.state.el.len}</p>
                            <p>{this.state.el.address}</p>
                        </div>
                        {/* <a href="tel:400-100-1111"><Icon type="phone" className="tel" /></a> */}
                        <div className="g_right"><Icon type="phone" className="tel" /></div>
                    </div>
                    <div className="info">
                        <h3>商家信息</h3>
                        <p>百岁山水站简单介绍描述百岁山水站简单介绍描述百岁山水站简单介绍描述</p>
                    </div>
                    <div className="w_comment">
                        <div className="c_hd" >
                            <p>TA们都在说</p>
                            <div onTouchEnd={() => this.showipt()}>
                                <span><Icon type="edit" />写评论</span>
                                <input className="write_ipt" className={this.state.isopticy ? 'xiepunlun xiepunlun1' : 'xiepunlun'}
                                    value={this.state.value}
                                    onChange={(e) => { this.change(e) }}
                                    onKeyDown={(e) => this.punlun(e)} type="text"
                                     />
                            </div>

                        </div>
                        <div>
                            {this.state.arr}
                            {/* <div className="com_detail">
                                <img src={img1} alt="" />
                                <div className="content">
                                    <div className="con_hd">
                                        <p>娃娃脸</p>
                                        <span>1小时前</span>
                                    </div>
                                    <div className="detail_con">这家水店服务特别好，送水速度快，水喝着也不错，而且经济实惠</div>
                                </div>
                            </div>
                            <div className="com_detail">
                                <img src={img1} alt="" />
                                <div className="content">
                                    <div className="con_hd">
                                        <p>娃娃脸</p>
                                        <span>1小时前</span>
                                    </div>
                                    <div className="detail_con">这家水店服务特别好，送水速度快，水喝着也不错，而且经济实惠</div>
                                </div>
                            </div> */}
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
export default detail