import VueI18n from 'vue-i18n';
import Vue from 'vue';
import enUS from './en-US';
import zhCN from './zh-CN';

Vue.use(VueI18n) /** VueI18n实例化之前要 调用Vue.use(VueI18n)生成实例 */

const LANGUAGE = 'en-US' // 默认英文
export default new VueI18n({
  locale: LANGUAGE,
  /* 'en-US': enUS,  'zh-CN': zhCN */
  messages: {
    'en-US': enUS,
    'zh-CN': zhCN
  }
})
