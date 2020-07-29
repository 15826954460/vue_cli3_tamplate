import Vue from "vue";
import App from "./App.vue";
import router from "@/router/index";
import store from "@/store/index";
import i18n from "@/i18n/index";
import "@/components/index";
import "@/assets/style/css/reset.css";
import "@/assets/style/css/flex.css";
import "@/assets/style/css/common.css";

import vAutosize from '@/directives/autosize/index';
Vue.directive('autosize', vAutosize);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
