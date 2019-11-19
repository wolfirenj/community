import React,{Component} from 'react'
import { Input, Button} from 'antd';
import './search.css'
class search extends Component{
    render(){
        return(
            <div className='search_box'>
                    <Input placeholder="search" />
                    <Button type="primary" className="public">我要发布</Button>
                </div>
        )
    }
}
export default search