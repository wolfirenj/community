import React, { Component } from 'react'
import { Icon, Rate ,message} from 'antd';
import './water.css'
import Header from '../../common/header/header'
// import img from '../../../static/img/shui.png'
class water extends Component {
    constructor() {
        super()
        this.state = {
            title: '送水到家',
            el:''
        }
    }
    componentWillMount() {
        this.$http({
            url: '/findWater',
            method: 'get'
        }).then(d => {
            console.log(d)
            if(d.data.code===-1){
                this.props.history.push('/login')
                return message.error(d.data.info);
            }
            if(d.data.code===0){
                this.setState({
                    el:d.data.data.map(item=>{
                        // console.log(item)
                        var num=Number(item.score)
                        return <div className="list" key={item.id} onTouchEnd={(id)=>{this.todetail(item.id)}}>
                        <img src={item.img} alt="" />
                        <div className="center">
                            <h3 >{item.name}</h3><Rate className="comment" value={num}/>
                            <p>{item.des}</p>
                            <span><Icon type="environment" />{item.address}</span>
                        </div>
                        <div className="right">
                            <Icon type="phone" className='phone' />
                            <p>{item.len}</p>
                        </div>
                    </div>
                    })
                })
            }
        })
    }
    todetail(id){
        this.props.history.push('/detail'+'/'+id)
    }
    render() {
        return (
            <div>
                <Header title={this.state.title}></Header>
                <div className="sort">
                    <ul>
                        <li>
                            <p>水站</p>
                            <Icon type="caret-down" className="down_arrow" />
                        </li>
                        <li>
                            <p>区域</p>
                            <Icon type="caret-down" className="down_arrow" />
                        </li>
                        <li>
                            <p>智能排序</p>
                            <Icon type="caret-down" className="down_arrow" />
                        </li>
                    </ul>
                </div>
                <div className="detail">
                    {this.state.el}
                    {/* <div className="list">
                        <img src={img} alt="" />
                        <div className="center">
                            <h3 >农夫山泉水站</h3><Rate number="4" className="comment" />
                            <p>用一份良心，送一份纯净</p>
                            <span><Icon type="environment" />石景山古城地铁北星座大厦</span>
                        </div>
                        <div className="right">
                            <Icon type="phone" className='phone' />
                            <p>200米</p>
                        </div>
                    </div>*/}
                </div>
            </div>
        )
    }
}
export default water