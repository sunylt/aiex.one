import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Button, Spin } from "antd"
import api from "../../utils/api"
import history from "../../utils/history"

class Trades extends Component {

    state = {
        loading: true,
        data: null
    }
    
    componentDidMount() {
        const { id } = this.props.match.params
        api.request("FETCH_TRADES", {id}).then(res => {
            this.setState({
                loading: false,
                data: res
            })
        })
    }

    goBack = () => {
        history.goBack()
    }

    render() {
        const data = this.state.data
        const itemList = data ? <List data={data} /> : null
        return (
        <div>
            <h2>交易记录</h2>
            <p>说明：列表数据为智能叫系统的每一笔操作记录，你可以查看最近的100次操作</p>
            <Spin spinning={this.state.loading}>
            <div className="trade-list">
                {itemList}
            </div>
            </Spin>
            <a href="javascript:;" onClick={this.goBack}>返回</a>
        </div>
        )
    }
}

const List = ({data}) => {
    const items = data.map((item) => (<p>{item}</p>))
    return (
        <div>{items.length ? items : "暂无数据"}</div>
    )
}

export default Trades