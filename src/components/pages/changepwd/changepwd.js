import React, { Component } from 'react'
import Header from '../../common/header/header'
import { Input, Button, message } from 'antd'
import './changepwd.css'
import qs from 'qs'

// var username = localStorage.getItem('username')
// var userpsd = localStorage.getItem('userpsd')
// console.log(username, userpsd)

class change extends Component {
    constructor() {
        super()
        this.state = {
            title: '修改密码',
            user: {
                name: '',
                pass: '',
                oldpass: ''
            }
        }
    }
    changeUser(e, attr) {
        var user = this.state.user
        user[attr] = e.target.value;
        this.setState({
            user: user
        })
    }

    change() {
        var that = this
        var username = localStorage.getItem('username')
        var userpsd = localStorage.getItem('userpsd')
        console.log(username, userpsd)
        this.$http({
            url: '/changePassUser',
            method: 'post',
            data:qs.stringify(this.state.user)
            // date: {
            //     name: username,
            //     oldpass: userpsd,
            //     newpass: this.state.user.oldpass
            // }
        }).then(d => {
            console.log(d);
            return that.props.history.replace('/login')
        })
    }

    // componentDidMount(){
    //     var str = JSON.parse(localStorage.getItem('account')).pass
    //     console.log(str)
    //     this.$http({
    //         url:'/changePassUser',
    //         method:'post',
    //         date:qs.stringify(this.state.user)
    //     }).then(d=>{
    //         console.log(d);
    //     })
    // }
    render() {
        return (
            <div className="psd_box">
                <Header title={this.state.title}></Header>
                <p className="psd">
                    <Input placeholder="请输入账号" onChange={(e) => { this.changeUser(e, "name") }} />
                </p>
                <p className="psd">
                    <Input.Password placeholder="请输入旧密码" onChange={(e) => { this.changeUser(e, "oldpass") }} />
                </p>
                <p className="psd">
                    <Input.Password placeholder="请输入新密码" onChange={(e) => { this.changeUser(e, "newpass") }} />
                </p>
                <p className="psd">
                    <Input.Password placeholder="确认新密码" onChange={(e) => { this.changeUser(e, "newpass") }} />
                </p>
                <Button type="primary" onTouchEnd={() => { this.change() }}>修改</Button>
            </div>
        )
    }
}
export default change