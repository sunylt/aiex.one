import React, { Component } from "react"
import { Form, Icon, Input, Button, Checkbox } from "antd"
import { connect } from "react-redux"
import Cookies from "js-cookie"
import Logo from "../components/logo"
import LoginActions from "../redux/LoginRedux"
import history from "../utils/history"

const FormItem = Form.Item

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
      e.preventDefault()
      this.props.form.validateFields((err, values) => {
          if (!err) {
              console.log("Received values of form: ", values)
              //this.props.setLogin(true)
              //Cookies.set("token", "tony", { expires: 1 })
              history.push("/dashboard")
          }
      })
  }
  render() {
      const { getFieldDecorator } = this.props.form
      return (
          <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
                  {getFieldDecorator("userName", {
                      rules: [ { required: true, message: "Please input your username!" } ],
                  })(
                      <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                  )}
              </FormItem>
              <FormItem>
                  {getFieldDecorator("password", {
                      rules: [ { required: true, message: "Please input your Password!" } ],
                  })(
                      <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                  )}
              </FormItem>
              <FormItem>
                  {getFieldDecorator("remember", {
                      valuePropName: "checked",
                      initialValue: true,
                  })(
                      <Checkbox>记住我</Checkbox>
                  )}
                  <a className="login-form-forgot" href="">忘记密码</a>
                  <Button type="primary" htmlType="submit" className="login-form-button">
            登 入
                  </Button>
          还以选择 <a href="https://api.aiex.one/oauth/google">谷歌</a> 登录
              </FormItem>
          </Form>
      )
  }
}

const WrappedNormalLoginForm = connect(
    () => ({}),
    dispatch => ({
        setLogin: status => dispatch(LoginActions.setLogin(status))
    })
)(Form.create()(NormalLoginForm))

const Login = () => {
    return (
        <div id="login">
            <h1><Logo />登录</h1>
            <WrappedNormalLoginForm />
        </div>
    )
}

export default Login