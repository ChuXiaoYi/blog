import React from 'react';

import {
  BasicLayoutProps,
  Settings as LayoutSettings,
} from '@ant-design/pro-layout';
import {RightContent} from "@/layout/RightContent";
import {Footer} from "@/layout/Footer";
import {createFromIconfontCN} from "@ant-design/icons";

export const layout = ({
                         initialState,
                       }: {
  initialState: { settings?: LayoutSettings };
}): BasicLayoutProps => {
  return {
    rightContentRender: () => <RightContent/>,
    // footerRender: () => <Footer/>,
    // onPageChange: () => {
    //   const { currentUser } = initialState;
    //   const { location } = history;
    //   // 如果没有登录，重定向到 login
    //   if (!currentUser && location.pathname !== '/user/login') {
    //     history.push('/user/login');
    //   }
    // },
    menuHeaderRender: undefined,
    contentStyle: {
      minHeight: '280px',
      padding: '24px',
      background: 'rgb(239 242 245)',
    },
    ...initialState?.settings,
  };
};

