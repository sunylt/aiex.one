import React, { Component } from "react"
import logo from "./logo.svg"
//import './App.css';

import { connect } from "react-redux"
import Creators from "./redux/NewsRedux"

import { Route, Link, Switch } from "react-router-dom"
import Home from "./containers/home"
import Login from "./containers/login"
import AuthRoute from "./components/AuthRoute"

import Dashboard from "./routers/dashboard/index"
import { Spin } from "antd"


class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <AuthRoute path="/dashboard" component={Dashboard} />
            </Switch>
        )
    }
}

export default App
