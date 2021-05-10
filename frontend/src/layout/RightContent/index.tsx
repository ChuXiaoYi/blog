// @flow
import * as React from 'react';
import {Avatar, Button, Dropdown, Menu, Space} from "antd";
import {createFromIconfontCN} from "@ant-design/icons";
import {history} from "umi";

type Props = {};

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2531977_uc1l08yh2w.js',
});

const menu = (
  <Menu>
    <Menu.Item>个人设置</Menu.Item>
    <Menu.Item>退出登录</Menu.Item>
  </Menu>
)

export const RightContent = (props: Props) => {


  return (
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
          <Avatar src='avatar.gif' alt='cxy'/>
          <span>一只路过的小码农</span>
        </Space>
      </Dropdown>
    </div>
  );
};
