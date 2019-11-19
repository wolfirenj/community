import React,{Component} from 'react'
import { Switch, Route, Redirect} from 'react-router-dom'
import Login from '../components/pages/login'
import Index from '../components/pages/index'
import register from '../components/pages/register/register'
import educate from '../components/pages/education/educate'
import communicate from '../components/pages/communicate/communicate'
import fixed from '../components/pages/fixed/fixed'
import fixdetail from '../components/pages/fixed/fixdetail'
import jiazheng from '../components/pages/jiazheng/jiazheng'
import jzlist from '../components/pages/jiazheng/keep_list'
import ysDetail from '../components/pages/jiazheng/ys_detail'
import more from '../components/pages/more/more'
import water from '../components/pages/water/water'
import detail from '../components/pages/water/detail'
import change from '../components/pages/changepwd/changepwd'

class Router extends Component{
    render(){
        return(
            <Switch>
                <Route path='/login' component={Login}></Route>
                <Route path='/index' component={Index}></Route>
                <Route path='/register' component={register}></Route>
                <Route path='/educate' component={educate}></Route>
                <Route path='/communicate' component={communicate}></Route>
                <Route path='/fixed' component={fixed}></Route>
                <Route path='/fixdetail/:id' component={fixdetail}></Route>
                <Route path='/jiazheng' component={jiazheng}></Route>
                <Route path='/keep_list/:id' component={jzlist}></Route>
                <Route path='/ys_detail/:id' component={ysDetail}></Route>
                <Route path='/more' component={more}></Route>
                <Route path='/water' component={water}></Route>
                <Route path='/detail/:id' component={detail}></Route>
                <Route path='/changepwd' component={change}></Route>
                <Redirect to='/index'></Redirect>
            </Switch>
        )
    }
}
export default Router