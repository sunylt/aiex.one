import React, { Component } from "react"
import { Route, Link, Switch } from "react-router-dom"
import { connect } from "react-redux"
import { Popover } from "antd"
import LoginActions from "../../redux/LoginRedux"
import Logo from "../../components/logo"
import history from "../../utils/history"

import Home from "./home"
import Tasks from "./tasks"
import AddTask from "./addTask"
import ViewTask from "./viewTask"
import Trades from "./Trades"
import Account from "./account"

class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isFetching: false
        }
    }

    logOut = () => {
        this.props.logOut(() => history.replace("/login"))
    }

    componentDidMount() {
    }

    render() {

        const { match, userInfo, isLogin } = this.props

        const UserMenu = (
            <div>
                <p><Link to={`${match.url}/me`}>个人信息</Link></p>
                <p><a href="javascript:;" onClick={this.logOut}>退出</a></p>
            </div>
        )

        return (
            <div id="dashboard">
                <header id="pageHeader">
                    <div className="logo"><Logo style={{ fontSize:"20px" }} />管理后台</div>
                    <ul className="nav">
                        <li><Link to={`${match.url}`}>工作台</Link></li>
                        <li><Link to={`${match.url}/tasks`}>我的任务</Link></li>
                        <li><Link to={`${match.url}/methods`}>策略中心</Link></li>
                    </ul>
                    <div className="userCenter">
                        <Popover placement="topLeft" content={UserMenu} trigger="click">
                            <img src={userInfo.avatar} alt="" />
                        </Popover>
                    </div>
                </header>
                <section id="contentWrap">
                    <Switch>
                        <Route exact path={`${match.url}`} component={Home} />
                        <Route exact path={`${match.url}/tasks`} component={Tasks} />
                        <Route path={`${match.url}/tasks/add`} component={AddTask} />
                        <Route path={`${match.url}/tasks/trades/:id`} component={Trades} />
                        <Route path={`${match.url}/tasks/balances/:id`} component={Balances} />
                        <Route path={`${match.url}/tasks/:id`} component={ViewTask} />
                        <Route path={`${match.url}/me`} component={Account} />
                    </Switch>
                </section>
            </div>
        )
    }
}

const Balances = () => (<div>资金记录</div>)


export default connect(
    ({ login })=>({
        isLogin: login.isLogin,
        userInfo: login.userInfo
    }),
    dispatch => ({
        logOut: (cb) => dispatch(LoginActions.logOut(cb))
    })
)(Dashboard)