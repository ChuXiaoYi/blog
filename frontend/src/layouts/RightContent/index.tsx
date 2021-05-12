// @flow
import * as React from 'react';
import {Avatar, Button, Dropdown, Menu, Space} from "antd";
import {history} from "umi";
import {useModel} from "@@/plugin-model/useModel";
import {IconFont} from "@/components/IconFont";
import {Login} from "@/pages/User/Login";
import {logout} from "@/pages/User/service";

type Props = {};


export const RightContent = (props: Props) => {

  // @ts-ignore
  const {initialState: {currentUser}, setInitialState} = useModel('@@initialState');

  const menu = (
    <Menu>
      <Menu.Item>个人设置</Menu.Item>
      <Menu.Item onClick={() => {
        logout().then(resp =>{
          setInitialState({currentUser: null})
        })
      }}>退出登录</Menu.Item>
    </Menu>
  )

  return (
    <>
      {currentUser && (
        <div>
          <Button
            type="primary"
            style={{
              marginRight: '20px'
            }}
            icon={<IconFont type="icon-tubiaozhizuomoban-"/>}
            onClick={() => history.push('/post/new')}
          >开始创作</Button>

          <Dropdown overlay={menu}>
            <Space>
              <Avatar src={currentUser.avatar} alt='cxy'/>
              <span>{currentUser.name}</span>
            </Space>
          </Dropdown>
        </div>
      )}
      {!currentUser && (
        <div>
          <Space>
            <Login/>
            <Button>注册</Button>
          </Space>
        </div>
      )}
    </>
  );
};
