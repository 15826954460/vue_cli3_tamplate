/**
 * @author 柏运送
 * @date 2020-06-29 18:03:41
 * @description 环境配置
*/

const { NODE_ENV, VUE_ENV_APP } = process.env;

const isDev = NODE_ENV === 'development' && VUE_ENV_APP === 'development';
const isPro = NODE_ENV === 'production' && VUE_ENV_APP === 'production';
const isTest = NODE_ENV === 'test' && VUE_ENV_APP === 'test';

export {
  isDev, isPro, isTest,
}