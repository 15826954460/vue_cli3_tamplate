import Vue from "vue";
import Router from "vue-router";
/** -------------以下为手动注册路由的代码------------- */
// import homeConfig from "./home";
// import aboutConfig from "./about";
// const routes = [...homeConfig, ...aboutConfig];
/** -------------以上为手动注册路由的代码------------- */
Vue.use(Router);

/** -------------以下为自动注册路由的代码------------- */
let routes = [];
const routerContext = require.context('.', true, /index\.js/)
routerContext.keys().forEach(routeName => {
  if (routeName.startsWith("./index")) return // 排除根index.js
  const routeModule = routerContext(routeName) // get router module object
  routes = [...routes, ...(routeModule.default || routeModule)] // 注册路由
});
/** -------------以上为自动注册路由的代码------------- */
export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes
});
