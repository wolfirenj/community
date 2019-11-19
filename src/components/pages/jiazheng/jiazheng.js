import React, { Component } from 'react'
import Header from '../../common/header/header'
import Search from '../../common/search/search'
import { Carousel, message } from 'antd';
import img from '../../../static/img/ind01.jpg'
import img1 from '../../../static/img/remark.jpg'
import img2 from '../../../static/img/hs_ft.png'
import './jiazheng.css'
class jiazheng extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '找家政',
            el: '',
            el1: ''
        }
    }

    componentWillMount() {
        //获取轮播
        this.$http({
            url: '/homeBanner',
            method: 'get'
        }).then(d => {
            console.log(d)
            this.setState({
                el: d.data.data.map(item => {
                    return <div key={item.id}>
                        <img src={item.img} alt="" />
                    </div>
                })
            })
        })
        //获取类型
        this.$http({
            url: '/getHomeType',
            method: 'get'
        }).then(d => {
            console.log(d);
            if (d.data.code === -1) {
                this.props.history.push('/denglu')
                return message.error(d.data.info);
            }
            if (d.data.code === 0) {
                this.setState({
                    el1: d.data.type.map((item, index) => {
                        return <li className="hs_list" style={{ width: "25%" }} key={index} onTouchEnd={(id) => { this.yuesao(item) }}>
                            <img src={img1} alt="" />
                            <p>{item}</p>
                        </li>
                    })
                })
            }else{
                return message.error(d.data.info);
            }

        })
    }
    yuesao(id) {
        this.props.history.push('/keep_list/' + id)
    }
    render() {
        return (
            <div>
                <Header title={this.state.title}></Header>
                <Search></Search>
                <div className="lunbo">
                    <Carousel autoplay>
                        {this.state.el}
                        {/* <div>
                            <img src={img} alt="" />
                        </div>
                        <div>
                            <img src={img} alt="" />
                        </div>
                        <div>
                            <img src={img} alt="" />
                        </div>
                        <div>
                            <img src={img} alt="" />
                        </div> */}
                    </Carousel>
                </div>
                <div className="housekeep">
                    <ul className="hs_detail">
                        {this.state.el1}
                        {/* <li className="hs_list">
                            <img src={img1} alt="" />
                            <p>钟点工</p>
                        </li>
                        <li className="hs_list">
                            <img src={img1} alt="" />
                            <p>保姆</p>
                        </li>
                        <li className="hs_list" onTouchEnd={() => this.toDes('keep_list')}>
                            <img src={img1} alt="" />
                            <p>月嫂</p>
                        </li>
                        <li className="hs_list">
                            <img src={img1} alt="" />
                            <p>专业保洁</p>
                        </li>
                    </ul>
                    <ul className="hs_detail">
                        <li className="hs_list">
                            <img src={img1} alt="" />
                            <p>家电清洗</p>
                        </li>
                        <li className="hs_list">
                            <img src={img1} alt="" />
                            <p>家具保养</p>
                        </li>
                        <li className="hs_list">
                            <img src={img1} alt="" />
                            <p>新居开荒</p>
                        </li>
                        <li className="hs_list">
                            <img src={img1} alt="" />
                            <p>更多</p>
                        </li> */}
                    </ul>
                </div>
                <div className="hs_footer">
                    <img src={img2} alt="" />
                    <img src={img2} alt="" />
                </div>
            </div>
        )
    }
}
export default jiazheng