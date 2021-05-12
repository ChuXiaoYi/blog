export default [
  {name: '主页', path: '/', component: '@/pages/PostList'},
  {name: '项目', path: '/projects'},
  {name: '归档', path: '/achieve'},
  {name: '时间轴', path: '/timeline'},
  {name: '关于我', path: '/about'},

  {name: '列表', path: '/post/list', component: '@/pages/PostList', hideInMenu: true},
  {name: '详情', path: '/post/detail', component: '@/pages/PostDetail', hideInMenu: true},
  {name: '编辑', path: '/post/edit', component: '@/pages/PostEdit', hideInMenu: true},
  {name: '新建', path: '/post/new', component: '@/pages/PostEdit', hideInMenu: true},

  {name: '登录/注册', path: '/user/login', component: '@/pages/User/Login', hideInMenu: true},
  {name: '注册', path: '/user/register', component: '@/pages/User/Register', hideInMenu: true},
  {name: '个人设置', path: '/user/setting', component: '@/pages/User/UserSetting', hideInMenu: true},
]
