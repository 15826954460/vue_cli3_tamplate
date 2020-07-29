/**
 * @author 柏运送
 * @date 2020-07-11 16:17:01
 * @description 全局方法
*/

import util from '@/utils/util';
export default {
  /**
   * 注册事件监听
   * @param {unWatch, unWatchRule, watchVal, cb, deep, immediate } param0
   * @param unWatch 解除监听规则的函数名
   * @param watchVal 监听函数名
   * @param cb 回调函数
   * @param unWatchRule 解除监听函数的规则
   * @param deep 是否进行深度监听
   * @param immediate 是否初始化时触发监听
   */
  methods: {
    // 创建watch
    createWatch({ unWatch, watchVal, unWatchRule, immediate, deep, callback }) {
      // 参数校验
      if (typeof watchVal !== 'string' || !(callback instanceof Function)) {
        // 根据实际给出相应的提示,这里只是简单粗暴的返回
        return;
      }
      this[unWatch] = this.$watch(
        watchVal,
        (newVal, oldVal) => {
          console.log(`oldVal ==> ${oldVal}  newVal ===> ${newVal}`);
          callback(oldVal, newVal);
          if (unWatchRule) {
            if (newVal === unWatchRule) {
              console.log(`清除监听  => ${unWatch}`);
              this[unWatch]();
            }
          }
          // 页面销毁之前解除事件监听
          this.$once('hook:beforeDestroy', () => {
            console.log(`hook:beforeDestroy ---- ${watchVal},  ${this[unWatch] instanceof Function}`);
            if (this[unWatch] instanceof Function) {
              this[unWatch]();
            }
          })
        },
        { deep, immediate }
      )
    },
    // 注册事件监听
    injectWatchs(params) {
      if (!params) return;
      if (util.dataTypeDetection(params) === 'object') {
        let { watchVal, callback, unWatch = '', unWatchRule = '', deep = false, immediate = false } = params;
        unWatch = `${unWatch}-${Date.now() * Math.random()}`;
        this.createWatch({ unWatch, watchVal, unWatchRule, immediate, deep, callback });
      } else if (util.dataTypeDetection(params) === 'array') {
        params.forEach((item) => {
          let { watchVal, callback, unWatch = '', unWatchRule = '', deep = false, immediate = false } = item;
          unWatch = `${unWatch}-${Date.now() * Math.random()}`;
          this.createWatch({ unWatch, watchVal, unWatchRule, immediate, deep, callback });
        });
      }
    }
  }
}
