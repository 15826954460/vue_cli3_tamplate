/**
 * @author 柏运送
 * @date 2020-06-29 16:44:21
 * @description 注册全局组件
*/
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import Vue from "vue";

// https://webpack.js.org/guides/dependency-management/#require-context
const requireComponent = require.context(
  "./common",
  true,
  /[A-Za-z]+\.vue$/
);

console.log(11111, requireComponent.keys());

requireComponent.keys().length && requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);
  const componentName = upperFirst(
    camelCase(fileName.slice(fileName.lastIndexOf('/')).replace(/\.\w+$/, ""))
  );
  Vue.component(componentName, componentConfig.default || componentConfig);
});