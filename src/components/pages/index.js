import React, { Component } from 'react'
import { Icon, Input, Button, Carousel, message, Drawer } from 'antd';
import './index.css'
import img from '../../static/img/ind01.jpg'
import img1 from '../../static/img/ind_logo.jpg'
import img2 from '../../static/img/ind_logo02.jpg'
import img3 from '../../static/img/ind_logo03.jpg'
import img4 from '../../static/img/ind_logo06.jpg'
import img5 from '../../static/img/ind_logo05.jpg'
import img6 from '../../static/img/ind_logo04.jpg'
import img7 from '../../static/img/weather.jpg'
import educate from './education/educate';
import image1 from '../../static/img/1.png'
import image2 from '../../static/img/2.png'
import image3 from '../../static/img/3.png'
import image4 from '../../static/img/4.png'
import image5 from '../../static/img/5.png'
import image6 from '../../static/img/6.png'
import image7 from '../../static/img/7.png'
import image8 from '../../static/img/8.png'
import image9 from '../../static/img/9.png'
import image10 from '../../static/img/10.png'
import image11 from '../../static/img/touxiang.png'
// import SideMenu from 'react-native-side-menu'
// let {width,height} = Dimensions.get('window');
class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            el: '',
            time: '',
            cityName: '',
            style: {
                left: "-4rem"
            },
            startX: 0,
            endX: 0,
            startY:0,
            endY:0,
            isshow: true,
            src: 'http://b-ssl.duitang.com/uploads/item/201805/13/20180513224039_tgfwu.png'
        }
    }
    componentDidMount() {
        //bmap
        var { BMap } = window
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(116.331398, 39.897445);
        map.centerAndZoom(point, 12);

        var myCity = new BMap.LocalCity();
        myCity.get((result) => {
            var cityName = result.name;
            map.setCenter(cityName);
            console.log(cityName);
            this.setState({
                cityName: cityName
            })
        });
    }
    componentWillMount() {
        this.$http({
            url: '/banner',
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
                        return <div key={item.id}><img src={item.img} alt="" /></div>
                    })
                })
            }
        })
        this.$http({
            url:'/findUser',
            method:'post',
            data:{
                name:localStorage.getItem('username')
            }
        }).then(d=>{
            console.log(d)
            this.setState({
                src:d.data.data[0].img
            })
        })
    }
    type(d) {
        this.props.history.push('/' + d);
    }
    start(e) {
        this.setState({
            startX: e.touches[0].clientX,
            endX: 0
        })
    }
    move(e) {
        this.setState({
            endX: e.touches[0].clientX
        })
    }
    end() {
        if (this.state.endX !== 0 && this.state.endX > this.state.startX + 100) {
            this.setState({
                style: {
                    left: '0'
                }
            })
            return
        }
        if (this.state.endX !== 0 && this.state.startX > this.state.endX + 100) {
            this.setState({
                style: {
                    left: '-4rem'
                }
            })
        }
    }

    starts(e){
        this.setState({
            startY: e.touches[0].clientY,

            endY: 0
        })
    }
    moves(e){
        this.setState({
            endY: e.touches[0].clientY
        })
    }
    ends(){
        if(this.state.endY==0){
            return
        }
    }

    showAside() {
        this.setState({
            isshow: !this.state.isshow
        })
        this.state.isshow ? this.setState({
            style: {
                left: '0'
            }
        }) : this.setState({
            style: {
                left: '-4rem'
            }
        })

    }
    exit() {
        this.$http({
            url: '/exit',
            method: 'get'
        }).then(d => {
            console.log(d);
            if (d.data.code === -1) {
                this.props.history.push('/login')
                return message.error(d.data.info);
            }
            if (d.data.code === 0) {
                this.props.history.push('/login')
                return message.error(d.data.info)
            }
        })
    }

    change(e) {
        console.log(e.target.files[0])
        var file=e.target.files[0]
        var last=file.name.slice(file.name.lastIndexOf('.'))
        var name=new Date().getTime()+Math.floor(Math.random()*99999)+last
        //读取文件
        var reader=new FileReader()
        reader.readAsDataURL(file)
        reader.onload=(e)=>{
            this.setState({
                src:e.target.result
            })
        }
        //获取token
        var qiniu = require('qiniu-js')
        this.$http({
            url:'/getToken',
            method:'get'
        }).then(res=>{
            console.log(res)
            var token=res.data.token
            qiniu.upload(file,name,token).subscribe(res=>{
                console.log(res)
                if(res.total.percent==100){
                    //图片上传七牛云成功
                    var url='http://pvlhd4kmv.bkt.clouddn.com/'+name
                    console.log(url);
                    this.$http({
                        url:'/updateUser',
                        method:'post',
                        data:{
                            name:localStorage.getItem('username'),
                            img:url
                        }
                    }).then(d=>{
                        console.log(d)
                        if(d.data.code===0){
                            this.$http({
                                url:'/findUser',
                                method:'post',
                                data:{
                                    name:localStorage.getItem('username')
                                }
                            }).then(d=>{
                                console.log(d)
                                if(d.data.code===0){
                                    this.setState({
                                        src:d.data.data[0].img
                                    })
                                }
                            })
                        }
                    })
                }
            })
        })
    }
    render() {
        var str = JSON.parse(localStorage.getItem('username'))
        // var str = JSON.parse(localStorage.getItem('username')) ? true : false
        // var str1 = str ? JSON.parse(localStorage.getItem('username')).name : '未登录'
        // var a = this.state.cityName;
        return (
            <div className="outer_box"
                onTouchStart={(e) => { this.start(e) }}
                onTouchMove={(e) => { this.move(e) }}
                onTouchEnd={(e) => { this.end(e) }}
            >
                <div className="index_box"
                    style={this.state.style}
                >
                    {/* 侧边栏 */}
                    <div className="sidebar">
                        <div className="self_img">
                            <img src={this.state.src} alt="" />
                            <input type="file" onChange={($event) => { this.change($event) }} />
                            <span>{str}</span>
                        </div>
                        <ul>
                            <li onTouchEnd={() => { this.type('educate') }}><img src={image1} alt="" />找家教</li>
                            <li onTouchEnd={() => { this.type('water') }}><img src={image2} alt="" />送水到家</li>
                            <li onTouchEnd={() => { this.type('fixed') }}><img src={image3} alt="" />维修服务</li>
                            <li onTouchEnd={() => { this.type('jiazheng') }}><img src={image4} alt="" />家政服务</li>
                            <li onTouchEnd={() => { this.type('communicate') }}><img src={image5} alt="" />社区互动</li>
                            <li><img src={image6} alt="" />消息中心</li>
                            <li><img src={image7} alt="" />我的收藏</li>
                            <li><img src={image8} alt="" />我的发布</li>
                            <li onTouchEnd={() => { this.type('changepwd') }}><img src={image9} alt="" />账号设置</li>
                            <li onTouchEnd={() => { this.exit() }}><img src={image10} alt="" />退出登录</li>
                        </ul>
                    </div>
                    <div className="home">
                        <div className='index_hd'>
                            <Icon type="menu" className="menu" onTouchEnd={() => this.showAside()} />
                            <p>龙山家园</p>
                            <Icon type="environment" className="dingwei" />
                            <span className="gps" id="allmap">
                                {this.state.cityName}
                            </span>
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
                        <div className="weather clearfix">
                            <img src={img7} alt='' />
                            <div className="left">
                                <p className="rain">多云/小雨  27/30°</p>
                                <p className="cloud">3-4级/4-5级风</p>
                            </div>
                            <div className="right">
                                <p className="rain">星期一</p>
                                <p className="cloud">18：00</p>
                            </div>
                        </div>
                        <div className="server"
                        onTouchStart={(e)=>{this.starts(e)}}
                        onTouchMove={(e)=>{this.moves(e)}}
                        onTouchEnd={(e)=>{this.ends(e)}}>
                            <ul>
                                <li className="type"
                                onClick={() => { this.type('educate') }}
                                onTouchStart={(e)=>{this.starts(e)}}
                                onTouchMove={(e)=>{this.moves(e)}}
                                onTouchEnd={()=>{this.ends()}}
                                >
                                    <img src={img1} alt="" />
                                    <p>找家教</p>
                                </li>
                                <li className="type" onClick={() => { this.type('water') }}
                                onTouchStart={(e)=>{this.starts(e)}}
                                onTouchMove={(e)=>{this.moves(e)}}
                                onTouchEnd={()=>{this.ends()}}>
                                    <img src={img2} alt="" />
                                    <p>送水到家</p>
                                </li>
                                <li className="type" onClick={() => { this.type('fixed') }}
                                onTouchStart={(e)=>{this.starts(e)}}
                                onTouchMove={(e)=>{this.moves(e)}}
                                onTouchEnd={()=>{this.ends()}}>
                                    <img src={img3} alt="" />
                                    <p>维修服务</p>
                                </li>
                            </ul>
                            <ul>
                                <li className="type" onClick={() => { this.type('jiazheng') }}
                                onTouchStart={(e)=>{this.starts(e)}}
                                onTouchMove={(e)=>{this.moves(e)}}
                                onTouchEnd={()=>{this.ends()}}>
                                    <img src={img4} alt="" />
                                    <p>家政</p>
                                </li>
                                <li className="type" onClick={() => { this.type('communicate') }}
                                onTouchStart={(e)=>{this.starts(e)}}
                                onTouchMove={(e)=>{this.moves(e)}}
                                onTouchEnd={()=>{this.ends()}}>
                                    <img src={img5} alt="" />
                                    <p>社区互动</p>
                                </li>
                                <li className="type" onClick={() => { this.type('more') }}
                                onTouchStart={(e)=>{this.starts(e)}}
                                onTouchMove={(e)=>{this.moves(e)}}
                                onTouchEnd={()=>{this.ends()}}>
                                    <img src={img6} alt="" />
                                    <p>更多服务</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    

                </div>
            </div>
        )
    }
}
export default index