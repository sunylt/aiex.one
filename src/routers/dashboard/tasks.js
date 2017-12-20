import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Table,  Button, Icon, Card, Col, Row, Spin } from "antd"
import api from "../../utils/api"

class Tasks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            tasks: []
        }
    }

    componentDidMount() {
        api.request("FETCH_TASK").then(res => {
            this.setState({
                tasks: res,
                loading: false
            })
        })
    }

    handelDelete = (id) => {
        if (window.confirm("你确定删除此任务吗?")) {
            api.request("EDIT_TASK", {id: id, status: "-6"}).then(res => console.log(res))
            const tasks = this.state.tasks.filter((item) => {
                return item._id != id
            })
            this.setState({
                tasks
            })
        }
    }

    render() {
        const { match } = this.props
        return (
            <div className="tasks">
                <div style={{ paddingBottom:"15px" }}>
                <Spin spinning={this.state.loading}>
                    <Row gutter={16}>
                        {
                            this.state.tasks.map(task => <TaskItem handelDelete={this.handelDelete} key={task._id} data={task} /> )
                        }
                    </Row>
                </Spin>
                </div>
                <Button size="large" type="primary" ghost><Link to={`${match.url}/add`}>创建任务</Link></Button>
            </div>
        )
    }
}


const PAID_STATE = {
    "0": "试用中",
    "1": "已付款",
    "-1": "待付款",
    "-2": "已过期"
}

const TASK_STATE = {
    "0": "初始化",
    "1": "运行中",
    "-1": "等待停止",
    "-2": "已停止",
    "-6": "等待删除",
    "-7": "已删除",
}

const TaskItem = ({ data, handelDelete}) => {
    const payLink = data.paid == -1 ? <a href="" title="付款">(付款)</a> : null

    return (
        <Col span={6}>
            <Card title={`${data.platform}.${data.tradepair}`} extra={<Link to={`/dashboard/tasks/${data._id}`}>详情</Link>}>
                <p>收益状态：+150%</p>
                <p>付款状态：{PAID_STATE[data.paid]}{payLink}</p>
                <p>任务状态：{TASK_STATE[data.status]}<button style={{marginLeft:"10px"}}>{data.status > 0 ? "暂停" : "开始"}</button></p>
                <p>交易记录：<Link to={`/dashboard/tasks/trades/${data._id}`}>查看</Link></p>
                <p>资金记录：<Link to={`/dashboard/tasks/balances/${data._id}`}>查看</Link></p>
                <div className="btn-delete" onClick={() => handelDelete(data._id)}><Icon type="delete" /></div>
            </Card>
        </Col>
  
    )
}

export default Tasks