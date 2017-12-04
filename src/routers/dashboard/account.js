import React, { Component } from "react"
import { connect } from "react-redux"

const Account = ({ userInfo }) => (
    <div className="account">
        <h1>账户中心</h1>
        <ul>
            <li>ID：{userInfo.uid}</li>
            <li>用户名：{userInfo.name}</li>
            <li>区域：{userInfo.language}</li>
        </ul>
    </div>
)

export default connect(
    ({ login }) => ({
        userInfo: login.userInfo
    })
)(Account)