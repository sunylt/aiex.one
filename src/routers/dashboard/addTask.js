import React, { Component } from "react"
import { Button, Select, Form, Input, Checkbox } from "antd"
import api from "../../utils/api"
import history from "../../utils/history"

const { TextArea } = Input
const Option = Select.Option
const FormItem = Form.Item

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
}
const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
}

function handleChange(value) {
    console.log(`selected ${value}`)
}

class DynamicRule extends React.Component {
    state = {
        checkNick: false,
    };

    check = () => {
        this.props.form.validateFields(
            (err, formData) => {
                if (!err) {
                    console.info(formData)
                    api.request("ADD_TASK", formData).then(res => {
                        if (res.status) {
                            history.push("/dashboard/tasks")
                        }
                    })
                }
            }
        )
    }

    addTask() {
        api.request("ADD_TASK", {}).then(res => {
            console.log(res)
        })
    }

    componentDidMount() {
        //this.props.onSubmit()
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <FormItem {...formItemLayout} label="交易平台">
                    {getFieldDecorator("platform", {
                        initialValue: "poloniex",
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
                        initialValue: "usdt-btc",
                        rules: [ {
                            required: true,
                            message: "请选择交易兑换种类",
                            initialValue: "usdt-btc"
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
                        rules: [ {
                            required: true,
                            message: "API KEY不能为空",
                        } ],
                    })(
                        <TextArea placeholder="请输入API KEY" autosize={{ minRows: 2, maxRows: 6 }} />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="API SECRET">
                    {getFieldDecorator("apisecret", {
                        rules: [ {
                            required: true,
                            message: "请输入API SECRET",
                        } ],
                    })(
                        <TextArea placeholder="请输入API SECRET" autosize={{ minRows: 2, maxRows: 6 }} />
                    )}
                </FormItem>
          
                <FormItem {...formTailLayout}>
                    <Button type="primary" onClick={this.check}>创建任务</Button>
                </FormItem>
            </div>
        )
    }
}

const WrappedDynamicRule = Form.create()(DynamicRule)

  
const AddTask = () => (
    <div className="addTask">
        <h1>创建交易任务</h1>
        <WrappedDynamicRule onSubmit={() => {alert(1)}} />
    </div>
)

export default AddTask