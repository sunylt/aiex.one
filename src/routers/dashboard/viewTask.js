import React, { Component } from "react"
import { Link } from "react-router-dom"
import api from "../../utils/api"

class ViewTask extends Component  {

    state = {
        task: {}
    }

    componentDidMount() {
        const { id } = this.props.match.params
        api.request("FETCH_TASK", { id }).then(res => {
            if (res._id) {
                this.setState({
                    task: res
                })
            }
        })
    }

    render() {
        const { id } = this.props.match.params
        const task = this.state.task
        return (
            <div className="task-intro">
                <h1>任务详情：</h1>
                <ul>
                    {
                        Object.keys(task).map(item => (
                            <li key={item}>{item}: {task[item]}</li>
                        ))
                    }
                </ul>
                <p><Link to="/dashboard/tasks">返回</Link></p>
            </div>
        )
    }
}

export default ViewTask