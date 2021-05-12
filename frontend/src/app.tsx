import React from 'react';

import {BasicLayoutProps, Settings as LayoutSettings,} from '@ant-design/pro-layout';
import {RightContent} from "@/layouts/RightContent";
import {Footer} from "@/layouts/Footer";
import {getLoginGithub} from "@/pages/User/service";


export async function getInitialState() {
  return getLoginGithub().then(resp => {
    console.log(resp)
    if (resp.data.current_user) {
      return {
        currentUser: resp.data.current_user
      };
    }
    return {currentUser: null}
  })
}


export const layout = ({initialState}: { initialState: { settings?: LayoutSettings, currentUser?: any }; }): BasicLayoutProps => {
  return {
    rightContentRender: () => <RightContent/>,
    footerRender: () => <Footer/>,
    menuHeaderRender: undefined,
    contentStyle: {
      minHeight: '280px',
      padding: '24px',
      background: 'rgb(239 242 245)',
    },
    iconfontUrl: "//at.alicdn.com/t/font_2531977_xy9265niq7.js",
    ...initialState?.settings,
  };
};

