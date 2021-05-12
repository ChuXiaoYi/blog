import {defineConfig} from "umi";
import routes from "./routes";
import proxy from "./proxy";

export default defineConfig({
  routes: routes,
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  locale: {
    default: 'zh-CN'
  },
  layout: {
    name: '建筑工地',
    layout: 'top',
    navTheme: 'light',
    logo: '/logo.gif'
  },
  publicPath: '/',
  favicon: '/logo.gif',
  proxy: proxy
})
