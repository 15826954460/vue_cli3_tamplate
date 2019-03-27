import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store/store.js";
import i18n from "./i18nConfig/i18nConfig.js";
import "@/components/globalCom" /** 直接引用js */
// import '@/mixin/mixin.js' // 全局混入的用法，对应 mixin/mixin.js 中注释代码
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
