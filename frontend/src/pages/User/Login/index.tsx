// @flow
import * as React from 'react';
import {Button, Checkbox, Form, Input, Modal, Tabs} from "antd";
import {FC, useEffect, useState} from "react";
import {UserOutlined, LockOutlined} from '@ant-design/icons';

import './index.less'
import {useModel} from "@@/plugin-model/useModel";
import {IconFont} from "@/components/IconFont";
import {request, useLocation, useRouteMatch} from "umi";
import {getLoginGithub, postLoginGithub} from "@/pages/User/service";


type Props = {};
export const Login: FC<Props> = (props: Props) => {

  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const {setInitialState} = useModel('@@initialState');

  const fetchCurrentUser = async () => {
    getLoginGithub().then(resp => {
      console.log(resp.data)
      if (resp.data.currentUser) {
        setInitialState({currentUser: resp.data.currentUser})
      } else {
        window.location.href = resp.data.url
      }
    })
  }

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>登录</Button>
      <Modal visible={visible} onCancel={() => setVisible(false)}
             onOk={() => setVisible(false)}
             footer={null} closable={false}
             destroyOnClose
      >
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="登录" key={"1"}>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{remember: true}}
              onFinish={values => {
                console.log(values)
                setInitialState({currentUser: values})
              }}
            >
              <Form.Item
                name="username"
                rules={[{required: true, message: 'Please input your Username!'}]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{required: true, message: 'Please input your Password!'}]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon"/>}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button>
                Or <a href="">register now!</a>
              </Form.Item>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="其他方式" key={"2"}>
            <Button icon={<IconFont type={"icon-GitHub"}/>}
                    onClick={() => fetchCurrentUser()}/>
          </Tabs.TabPane>
        </Tabs>

      </Modal>
    </>
  );
};

