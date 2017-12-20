import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import Cookies from "js-cookie"
import LoginActions from "../redux/LoginRedux"

class AuthRoute extends Component {

    componentDidMount() {
        if (Cookies.get("oauth")) {
            this.props.getUserInfo()
        }
    }

    render() {
        const { component: Component, isLogin, ...rest } = this.props
        const _isLogin = isLogin || Cookies.get("oauth") || true
        return (
            <Route {...rest} render={props => (
                _isLogin ? (
                    <Component {...props}/>
                ) : (
                    <Redirect to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}/>
                )
            )}/>
        )
    }
}

export default connect(
    ({ login }) => ({
        isLogin: login.isLogin
    }),
    dispatch => ({
        setLogin: status => dispatch(LoginActions.setLogin(status)),
        getUserInfo: status => dispatch(LoginActions.getUserInfo())
    })
)(AuthRoute)