import React, { Component } from 'react'
import Header from '../../common/header/header'
import Sort from '../../common/paihang/paihang'
import img from '../../../static/img/ys.png'
import { Tag ,Icon} from 'antd';
import './keep_list.css'
class klist extends Component {
    constructor() {
        super()
        this.state = {
            title: '月嫂',
            el:'',
            type:''
        }
    }
    toDesc(id){
        this.props.history.push('/ys_detail'+'/'+id)
    }
    componentWillMount(){
        this.$http({
            url:'/findHomeWorker',
            method:'get',
            params:{
                type:this.props.match.params.id
            }
        }).then(d=>{
            console.log(d)
            this.setState({
                el:d.data.data.map(item=>{
                    // console.log(item.len)
                    var num=parseFloat(item.len)
                    return <div className="ys_main" key={item.id} onTouchEnd={(id)=>{this.toDesc(item.id)}}>
                    <img src={item.img} alt="" className="ys_img"/>
                    <div className="ys_content">
                        <span className="ys_name">{item.name}</span><Tag color="green">{item.experience}教龄</Tag><Tag color="lime">{item.vNum}</Tag>
                        <p>{item.city} | {item.age}岁 | {item.edu} | {item.year}年经营</p>
                        <p>{item.info}</p>
                        <span className="ys_focus"><Icon type="eye" />关注 {item.readNum}</span>
                        <span className="ys_like"><Icon type="heart" theme="filled" />好评 {item.likeNum}</span>
                        <span className="ys_price">￥{item.price}</span>
                        <div className="ys_location"><Icon type="environment" theme="filled" />距你{item.len}</div>
                    </div>
                </div>
                })
            })
        })
    }
    render() {
        return (
            <div>
                <Header title={this.state.title}></Header>
                <Sort className="sort" style={{'background':'white'}}></Sort>
                <div className="ys_list">
                    {this.state.el}
                    {/* <div className="ys_main">
                        <img src={img} alt="" className="ys_img"/>
                        <div className="ys_content">
                            <span className="ys_name">王语</span><Tag color="green">6年教龄</Tag><Tag color="lime">V3</Tag>
                            <p>南京 | 47岁 | 大专 | 3年经营</p>
                            <p>资深的数学高级教师，毕业于师范大学，曾经带过两届高三班，讲课细致耐心学生都很喜欢他的课...</p>
                            <span className="ys_focus"><Icon type="eye" />关注 49290</span>
                            <span className="ys_like"><Icon type="heart" theme="filled" />好评 120</span>
                            <span className="ys_price">￥160/小时</span>
                            <div className="ys_location"><Icon type="environment" theme="filled" />距你3.8公里</div>
                        </div>
                    </div>
                    <div className="ys_main">
                        <img src={img} alt="" className="ys_img"/>
                        <div className="ys_content">
                            <span className="ys_name">王语</span><Tag color="green">6年教龄</Tag><Tag color="lime">V3</Tag>
                            <p>南京 | 47岁 | 大专 | 3年经营</p>
                            <p>资深的数学高级教师，毕业于师范大学，曾经带过两届高三班，讲课细致耐心学生都很喜欢他的课...</p>
                            <span className="ys_focus"><Icon type="eye" />关注 49290</span>
                            <span className="ys_like"><Icon type="heart" theme="filled" />好评 120</span>
                            <span className="ys_price">￥160/小时</span>
                            <div className="ys_location"><Icon type="environment" theme="filled" />距你3.8公里</div>
                        </div>
                    </div> */}
                </div>
            </div>
        )
    }
}
export default klist