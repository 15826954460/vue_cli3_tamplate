
module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '' : './', // 本地调试，默认为空
  devServer: {
    host: '0.0.0.0',
    port: 10020,
    https: false,
    proxy: {
      "/api/": {
        // 测试环境
        // 开发环境: 'https://micro.api.wps.com'
        target: "https://cnodejs.org/",
        secure: false // 如果是https接口，需要配置这个参数
      }
    }
  },
  productionSourceMap: false
};
