import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Button, Spin, Select, Form, Input } from "antd"
import api from "../../utils/api"

const TextArea = Input.TextArea
const FormItem = Form.Item
const Option = Select.Option


const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
}
const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
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

class ViewTask extends Component  {

    state = {
        loading: true,
        editMode: false,
        task: {}
    }

    componentDidMount() {
        const { id } = this.props.match.params
        api.request("FETCH_TASK", { id }).then(res => {
            if (res._id) {
                this.setState({
                    loading: false,
                    task: res
                })
            }
        })
    }

    editItem = () => {
        this.setState({
            editMode: true
        })
    }

    cancelEdit = () => {
        this.setState({
            editMode: false
        })
    }

    saveItem = () => {
        const _this = this
        this.props.form.validateFields((err, formData) => {
            if (!err) {
                formData.id = _this.state.task._id
                _this.setState({
                    loading: true
                })
                api.request("EDIT_TASK", formData).then(res => {
                    let data = _this.state.task
                    data.apikey = formData.apikey
                    data.tradepair = formData.tradepair
                    data.apisecret = formData.apisecret
                    _this.setState({
                        task: data,
                        loading: false
                    })
                    _this.cancelEdit()
                })
            }
        })
    }

    componentWillUpdate(nextProps, nextState) {

    }

    render() {
        const { id } = this.props.match.params
        const {editMode, task, loading} = this.state
        const { getFieldDecorator } = this.props.form
        const time = new Date(task.created_at)
        const editable = [-1, -6, -7].indexOf(task.status) > -1 ? false : true

        return (
            !editMode ? 
            (<div className="task-intro">
                <h2>任务详情</h2>
                <Spin spinning={loading}>
                <ul>
                    <li><span>任务ID：</span>{task._id}</li>
                    <li><span>交易平台：</span>{task.platform}</li>
                    <li><span>交易兑：</span>{task.tradepair}</li>
                    <li><span>API KEY：</span>{task.apikey}</li>
                    <li><span>API SECRET：</span>{task.apisecret}</li>
                    <li><span>支付状态：</span>{PAID_STATE[task.paid]}</li>
                    <li><span>任务状态：</span>{TASK_STATE[task.status]}</li>
                    <li><span>创建时间：</span>{task.created_at}</li>
                    <li><span>最后更新：</span>{task.updated_at}</li>
                </ul>
                </Spin>
                <p>
                    
                    {
                        editable ?
                        <Button key="1" type="primary" size="large" onClick={this.editItem}>编辑</Button>
                        :
                        <Button key="1" type="primary" size="large" onClick={this.editItem} disabled>编辑</Button>
                    }
                    <Button key="2" type="normal" size="large"><Link to="/dashboard/tasks">返回</Link></Button>
                </p>
            </div>)
            : 
            (<div className="task-edit">
                <Spin spinning={loading}>
                <h2>编辑任务：{`${task.platform}.${task.tradepair} 创建于 ${time}`}</h2>
                <div>
                <FormItem {...formItemLayout} label="交易平台">
                {getFieldDecorator("platform", {
                    initialValue: task.platform,
                    rules: [ {
                        required: true,
                        message: "请选择交易平台"
                    } ],
                })(
                    <Select style={{ width: 120 }}>
                        <Option value="poloniex">poloniex</Option>
                        <Option value="binance">binance</Option>
                    </Select>
                )}
               
            </FormItem>
            
            <FormItem {...formItemLayout} label="交易对换">
                {getFieldDecorator("tradepair", {
                    initialValue: task.tradepair,
                    rules: [ {
                        required: true,
                        message: "请选择交易兑换种类",
                        initialValue: "btc-usdt"
                    } ],
                })(
                    <Select  style={{ width: 120 }}>
                        <Option value="btc-usdt">btc-usdt</Option>
                        <Option value="zec-btc">zec-btc</Option>
                    </Select>
          
                )}
            </FormItem>
                    <FormItem {...formItemLayout} label="API KEY">
                    {getFieldDecorator("apikey", {
                        initialValue: task.apikey,
                        rules: [ {
                            required: true,
                            message: "请输入API KEY",
                        } ],
                    })(
                        <TextArea placeholder="请输入API KEY" autosize={{ minRows: 2, maxRows: 6 }} />
                    )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="API SECRET">
                    {getFieldDecorator("apisecret", {
                        initialValue: task.apisecret,
                        rules: [ {
                            required: true,
                            message: "请输入API SECRET"
                        } ],
                    })(
                        <TextArea placeholder="请输入API SECRET" autosize={{ minRows: 2, maxRows: 6 }} />
                    )}
                    </FormItem>
          
                <FormItem {...formTailLayout}>
                    <Button key="3" type="primary" size="large" onClick={this.saveItem}>保存</Button>
                    <Button key="4" type="normal" size="large" onClick={this.cancelEdit}>取消</Button>
                </FormItem>
                </div>
                </Spin>
            </div>)
        )
    }
}

const a = Form.create()(ViewTask)

export default a