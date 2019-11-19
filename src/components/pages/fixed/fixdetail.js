import React, { Component } from 'react'
import Header from '../../common/header/header'
import { Rate, Icon, Button ,message} from 'antd';
import img1 from '../../../static/img/touxiang.png'
import './fixdetail.css'
class detail extends Component {
    constructor() {
        super()
        this.state = {
            title: "详细",
            el:{},
            arr:''
        }
    }
    componentWillMount(){
        this.$http({
            url:'/findRepair',
            method:'get',
            params:{
                id:this.props.match.params.id
            }
        }).then(d=>{
            console.log(d)
            this.setState({
                el:d.data.data[0]
            })
        })

        this.$http({
            url:'/findRepairComment',
            method:'get',
            params:{
                id:this.props.match.params.id
            }
        }).then(d=>{
            console.log(d)
            if(d.data.code===-1){
                this.props.history.push('/login')
                return message.error(d.data.info);
            }
            if(d.data.code===0){
                this.setState({
                    arr:d.data.data.map(item=>{
                        return <div className="com_detail" key={item.id}>
                        <img src={item.ava} alt="" />
                        <div className="content">
                            <div className="con_hd">
                                <p>{item.name}</p>
                                <span>1小时前</span>
                            </div>
                            <div className="detail_con">{item.content}</div>
                        </div>
                    </div>
                    })
                })
            }else{
                return message.error(d.data.info)
            }
        })
    }
    render() {
        var num=Number(this.state.el.score)
        return (
            <div>
                <Header title={this.state.title}></Header>
                <div className="main">
                    <div className="f_hd">
                        <div className="theme">
                            <h3>{this.state.el.name}</h3>
                            <Rate allowHalf defaultValue={2.5} className="rate" value={num}/>
                        </div>
                        <div className="d_location">
                            <Icon type="environment" theme="twoTone" /><span>距你{this.state.el.len}</span>
                            <p>{this.state.el.address}</p>
                            <p>营业时间 : 09:00-18:00</p>
                            <em><Button type="primary">关注</Button><Button type="primary">向TA提问</Button></em>
                            <div className="d_like">
                                <span className='s_focus'><Icon type="eye" theme="twoTone" />关注 {this.state.el.readNum}</span>
                                <span className='s_like'><Icon type="heart" theme="twoTone" />好评 {this.state.el.likeNum}</span>
                            </div>
                            <Icon type="phone" theme="twoTone" className="icon_tel" />
                        </div>
                    </div>
                    <div className="info">
                        <h3>商家信息</h3>
                        <p>{this.state.el.info}</p>
                    </div>
                    <div className="w_comment">
                        <div className="c_hd">
                            <p>TA们都在说</p>
                            <span><Icon type="edit" />写评论</span>
                        </div>
                        <div className="s_com">
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
                            </div> */}
                        </div>
                    </div>
                    <div className="footer">
                        <Button className="share">分享</Button>
                        <Button className="contact" type="primary">与我联系</Button>
                    </div>
                </div>

            </div>
        )
    }
}
export default detail