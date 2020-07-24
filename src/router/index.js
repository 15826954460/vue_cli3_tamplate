import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

let routes = [];
const routerContext = require.context('./route-list', true, /index\.js/);

routerContext.keys().forEach(routeName => {
  const routeModule = routerContext(routeName);
  routes = [...routes, ...(routeModule.default || routeModule)];
});

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: routes
});
