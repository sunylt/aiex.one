
const SERVER_URL = "https://api.aiex.one"

const api = {
    request: function(type, data) {
        const action = this[type]
        if (!action) {
            console.log("action not found")
            return
        }

        let reqConfig = {
            method: action.method,
            mode: "cros",
            credentials: "include"
        }

        let reqData = []
        let url = action.url
        if (action.method == "GET") {
            for (let key in data) {
                reqData.push(`${key}=${data[key]}`)
            }
            if (reqData.length) {
                url += `?${reqData.join("&")}`
            }
        } else {
            reqConfig.body = JSON.stringify(data)
        }

        return fetch(url, reqConfig).then(res => res.json())
    },

    "LOGOUT": {
        url: `${SERVER_URL}/oauth/logout`,
        method: "GET"
    },
    "GET_USER_INFO": {
        url: `${SERVER_URL}/index/user`,
        method: "GET"
    },
    "ADD_TASK": {
        url: `${SERVER_URL}/tasks/add`,
        method: "POST"
    },
    "FETCH_TASK": {
        url: `${SERVER_URL}/tasks/get`,
        method: "GET"
    },
    "EDIT_TASK": {
        url: `${SERVER_URL}/tasks/edit`,
        method: "POST"
    },
    "FETCH_TRADES": {
        url: `${SERVER_URL}/tasks/trades`,
        method: "GET"
    },
    "FETCH_BALANCES": {
        url: `${SERVER_URL}/tasks/balances`,
        method: "GET"
    }
}

window.api = api

export default api