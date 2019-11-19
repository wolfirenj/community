import React, { Component } from 'react'
import { Icon } from 'antd';
import './paihang.css'
class sort extends Component {
    render() {
        return (
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
        )
    }
}
export default sort 