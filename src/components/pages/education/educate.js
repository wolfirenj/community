import React, { Component } from 'react'
import { Icon, Input, Button, Carousel,message } from 'antd';
// import './educate.styl'
import './educate.css'
import img from '../../../static/img/find.jpg'
import img1 from '../../../static/img/qa.jpg'
// import img2 from '../../../static/img/logo.jpg'
// import img3 from '../../../static/img/teacher.jpg'
// import img4 from '../../../static/img/teacher1.jpg'
class educate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            el: '',
            el1: '',
            el2: '',
            title:'找家教'
        }
    }
    componentWillMount() {
        this.$http({
            url: '/teacherBanner',
            method: 'get'
        }).then(d => {
            console.log(d)
            this.setState({
                el: d.data.data.map(item => {
                    return <div key={item.id}><img src={item.img} alt="" /></div>
                })
            })
        })

        this.$http({
            url: "/teacherType",
            method: "get"
        }).then(d => {
            console.log(d)
            if (d.data.code === -1) {
                this.props.history.push('/login')
                return message.error(d.data.info);
            }
            if (d.data.code === 0) {
                this.setState({
                    el1: d.data.data.map(item => {
                        return <li key={item.id}>
                            <img src={item.img} alt="" />
                            <p>{item.type}</p>
                        </li>
                    })
                })
            }

        })

        this.$http({
            url: "/teacherTop",
            method: "get"
        }).then(d => {
            console.log(d)
            this.setState({
                el2: d.data.data.map(item => {
                    return <li key={item.id}>
                        <img src={item.img} alt="" className='t_banner' />
                        <p>已报名{item.num}人</p>
                        <img src={item.teacherImg} alt="" className='t_img' />
                    </li>
                })
            })
        })
    }
    back() {
        window.history.go(-1)
    }
    render() {
        return (
            <div>
                <div className='edu_hd'>
                    <Icon type="left" className="left_arrow"  onTouchEnd={() => { this.back() }}/>
                    <p className="title">{this.state.title}</p>
                    <Icon type="user" className="user" />
                </div>
                <div className='search_box'>
                    <Input placeholder="search" />
                    <Button type="primary">我要发布</Button>
                </div>
                <div className="lunbo">
                    <Carousel autoplay>
                        {/* <div>
                            <img src={img} alt="" />
                        </div> */}
                        {this.state.el}
                    </Carousel>
                </div>
                <div className="around">
                    <div className="a_left clearfix">
                        <img src={img} alt="" />
                        <div>
                            <p>周边老师</p>
                            <p>发现身边好老师</p>
                        </div>
                    </div>
                    <div className="a_right clearfix">
                        <img src={img1} alt="" />
                        <div>
                            <p>我要提问</p>
                            <p>难题名师帮您解决</p>
                        </div>
                    </div>
                </div>
                <div className="kc_classify clearfix">
                    <ul className="clearfix">
                        {/* <li>
                            <img src={img2} alt="" />
                            <p>小学</p>
                        </li>
                        <li>
                            <img src={img2} alt="" />
                            <p>小学</p>
                        </li>
                        <li>
                            <img src={img2} alt="" />
                            <p>小学</p>
                        </li> */}
                        {this.state.el1}
                    </ul>
                </div>
                <div className="top">
                    <div className="e_title">
                        <div className="t_content">top排行榜</div>
                    </div>
                    <ul>
                        {/* <li>
                            <img src={img3} alt="" className='t_banner'/>
                            <p>已报名27人</p>
                            <img src={img4} alt="" className='t_img'/>
                        </li>
                        <li>
                            <img src={img3} alt="" className='t_banner'/>
                            <p>已报名27人</p>
                            <img src={img4} alt="" className='t_img'/>
                        </li> */}
                        {this.state.el2}
                    </ul>
                </div>
            </div>
        )
    }
}
export default educate