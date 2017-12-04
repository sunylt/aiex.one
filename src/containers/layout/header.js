import React from "react"
import Logo from "../../components/logo"

const Header = () => (
    <div className="header">
        <div className="logo"><Logo style={{ fontSize:"25px" }} />botex</div>
        <div className="nav">
            <ul>
                <li><a href="/login">登录</a></li>
                <li><a href="/register">注册</a></li>
                <li><a href="/help">帮助中心</a></li>
            </ul>
        </div>
    </div>
)

export default Header