import Vue from "vue";
import Router from "vue-router";
import homeConfig from "./home";
import aboutConfig from "./about";

Vue.use(Router);

const routes = [...homeConfig, ...aboutConfig];

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes
  // routes: [
  //   {
  //     path: '/',
  //     name: 'home',
  //     component: Home
  //   }
  // ]
});
