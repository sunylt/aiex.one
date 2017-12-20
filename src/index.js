import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import store from "./redux/"

import { HashRouter as Router } from "react-router-dom"

import "./index.css"
import App from "./App"
import registerServiceWorker from "./registerServiceWorker"

ReactDOM.render(
    <Provider store={ store }>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById("root")
)

registerServiceWorker()
