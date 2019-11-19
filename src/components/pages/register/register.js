import React, { Component } from 'react'
import reg from '../../../common/fn'
import { Icon, Button, Input, message } from 'antd';
class Register extends Component {
    constructor() {
        super()
        this.state = {
            user: {
                // type: "2",
                tel: "",
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
    // offtel() {
    //     if (!reg.phone(this.state.user.tel)) {
    //         message.warning('格式不正确');
    //         return false
    //     } else {
    //         return true
    //     }
    // }
    // offname() {
    //     if (reg.kongge(this.state.user.name) !== -1 || reg.ksgg(this.state.user.name) !== -1) {
    //         message.warning('名称中不能包含空格');
    //         return false
    //     } else {
    //         return true
    //     }
    // }
    register() {
        // if(this.offtel()&&this.offname()){
            
        // }
        this.$http({
            url:"/addUser",
            method:"post",
            data:this.state.user
        }).then(d=>{
            console.log(d)
            this.props.history.push('/login');
        })
    }
    render() {
        return (
            <dir>
                <div className="header clearfix">
                    <Icon type="left" className="left_arrow" />
                    <span>注册</span>
                </div>
                <div className="acc_ipt">
                    <Input placeholder="邮箱/手机号" value={this.state.user.tel} onChange={(e) => { this.changeUser(e, "tel") }} 
                    // onBlur={() => { this.offtel() }} 
                    />
                    <Input placeholder="账号" value={this.state.user.name} onChange={(e) => { this.changeUser(e, "name") }} 
                    // onBlur={() => { this.offname() }} 
                    />
                    <Input placeholder="6~10位密码" value={this.state.user.pass}
                        onChange={(e) => { this.changeUser(e, "pass") }} />
                </div>
                <div className='btn'>
                    <Button type="primary" block onTouchEnd={() => { this.register() }}>注册</Button>
                </div>
            </dir>
        )
    }
}
export default Register