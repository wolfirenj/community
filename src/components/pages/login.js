import React, { Component } from 'react'
import { Icon, Button, Input ,message} from 'antd';

import '../../static/css/login.css'
class login extends Component {
    constructor() {
        super()
        this.state = {
            user: {
                type: "2",
                name: "",
                pass: ""
            }
        }
    }
    changeUser(e, attr) {
        var user = this.state.user;
        user[attr] = e.target.value;
        this.setState({
            user: user
        })
    }
    login() {
        this.$http({
            url: '/login',
            method: "post",
            data: this.state.user
        }).then(d => {
            console.log(d)
            if (d.data.code === 0) {
                localStorage.setItem('username', this.state.user.name);
                localStorage.setItem('userpsd', this.state.user.pass);
                return this.props.history.push('/index')
            }else{
                message.error(d.data.info);
            }
        })
    }
    register() {
        this.props.history.push('/register');
    }
    render() {
        return (
            <div className="login_wrap">
                <div className="header clearfix">
                    <Icon type="left" className="left_arrow" />
                    <span>登录</span>
                </div>
                <div>
                    <div className="acc_ipt">
                        {/* <select value={this.state.user.type} onChange={(e)=>{this.changeUser(e,"type")}}>
                            <option value="" disabled={true}>--请选择--</option>
                            <option value="0">超管</option>
                            <option value="1">普管</option>
                            <option value="2">用户</option>
                        </select> */}
                        <Input placeholder="账号" value={this.state.user.name} onChange={(e) => { this.changeUser(e, "name") }} />
                        <Input placeholder="密码" value={this.state.user.pass} onChange={(e) => { this.changeUser(e, "pass") }} />
                    </div>
                    <div className='btn'>
                        <Button type="primary" block onTouchStart={() => { this.login() }}>登录</Button>
                    </div>
                </div>
                <div className="forget">忘记密码？</div>
                <div className='register' onTouchStart={() => { this.register() }}>注册</div>
            </div>
        )
    }
}
export default login