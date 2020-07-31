/**
 * @author bys
 * @date 2020-07-31 16:48:57
 * @description 注册跨组件的事件监听
 */

export default {
  install(Vue, options = {}) {
    const property = options.property || '$bus';
    const obs = new Vue();
    const bus = {
      emit(event, ...args) {
        obs.$emit(event, ...args)
      },
      on(event, callback) {
        obs.$on(event, callback)
      },
      off(event, callback) {
        obs.$off(event, callback)
      },
    };
    Vue.prototype[property] = bus;
  },
};
