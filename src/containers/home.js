import React, { Component } from "react"
import { Route, Link } from "react-router-dom"

import Header from "./layout/header"
import Footer from "./layout/footer"


const Home = () => {
    return (
        <div id="home">
            <Header />
            <div className="slogan">
                <h1>可能是全球最好用的数字货币智能交易系统</h1>
                <p><Link to="/login">立即体验</Link></p>
            </div>
            <Footer />
        </div>
    )
}

export default Home