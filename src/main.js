import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/store.js'
import i18n from './i18nConfig/i18nConfig.js'
Vue.config.productionTip = false
window.Vue = Vue
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
