import React, { Component } from 'react'
import { Icon } from 'antd';
import './header.css'
class header extends Component {
    back() {
        window.history.go(-1)
    }
    render() {
        return (
            <div className='hd'>
                <Icon type="left" className="left_arrow" onTouchEnd={() => { this.back() }} />
                <p className="title">{this.props.title}</p>
                <Icon type="user" className="user" />
            </div>
        )
    }
}
export default header