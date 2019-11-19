import React, { Component } from 'react'
import Header from '../../common/header/header'
import Sort from '../../common/paihang/paihang'
import { Rate, Icon ,message} from 'antd';
import './fixed.css'
class fixed extends Component {
    constructor() {
        super()
        this.state = {
            title: '商家列表',
            el: ''
        }
    }
    toDetail(id){
        this.props.history.push('/fixdetail'+'/'+id)
    }
    componentWillMount() {
        this.$http({
            url: '/findRepair',
            method: 'get',
        }).then(d => {
            console.log(d)
            if (d.data.code === -1) {
                this.props.history.push('/login')
                return message.error(d.data.info);
            }
            if (d.data.code === 0) {
                this.setState({
                    el: d.data.data.map(item => {
                        var num = Number(item.score)
                        return <div className="f_list" key={item.id}>
                            <div className="f_left" onTouchEnd={(id)=>{this.toDetail(item.id)}}>
                                <span>{item.name}</span><Rate allowHalf defaultValue={2.5} value={num}/>
                                <p>{item.type}</p>
                                <p className="location"><Icon type="environment" />{item.address}</p>
                            </div>
                            <div className="f_right">
                                <a  href="tel:14828283333"><Icon type="phone" theme="twoTone" className="phone" /></a>
                                {/* <Icon type="phone" theme="twoTone" className="phone" /> */}
                                <p>{item.len}</p>
                            </div>
                        </div>
                    })
                })
            }
        })
    }
    render() {
        return (
            <div>
                <Header title={this.state.title}></Header>
                <Sort></Sort>
                {this.state.el}
                {/* <div className="f_list">
                    <div className="f_left">
                        <span>百佳手机维修中心</span><Rate allowHalf defaultValue={2.5} />
                        <p>电脑、办公设备、网络、监控、门禁、数据恢复</p>
                        <p className="location"><Icon type="environment" />石景山古城地铁北星座大厦201</p>
                    </div>
                    <div className="f_right">
                        <Icon type="phone" theme="twoTone" className="phone" />
                        <p>200米</p>
                    </div>
                </div> */}
            </div>
        )
    }
}
export default fixed