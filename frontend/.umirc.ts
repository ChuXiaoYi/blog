import {defineConfig} from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {name: '主页', path: '/', component: '@/pages/PostList'},
    {name: '项目', path: '/projects'},
    {name: '归档', path: '/achieve'},
    {name: '时间轴', path: '/timeline'},
    {name: '关于我', path: '/about'},
    {name: '列表', path: '/post/list', component: '@/pages/PostList', hideInMenu: true},
    {name: '详情', path: '/post/detail', component: '@/pages/PostDetail', hideInMenu: true},
    {name: '编辑', path: '/post/edit', component: '@/pages/PostEdit', hideInMenu: true},
    {name: '新建', path: '/post/new', component: '@/pages/PostEdit', hideInMenu: true},
  ],
  fastRefresh: {},
  layout: {
    name: '建筑工地',
    layout: 'top',
    navTheme: 'light',
    logo: '/logo.gif'
  },
  publicPath: '/',
  favicon: '/logo.gif'
});
