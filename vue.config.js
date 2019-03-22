module.exports = {
  devServer: {
    host: "10.229.27.128", // 自己电脑ip
    port: 9090, // 自定义端口号
    https: false,
    proxy: {
      "/api/": {
        // 测试环境
        // 开发环境: 'https://micro.api.wps.com'
        target: "https://micro.api.wps.com",
        secure: false // 如果是https接口，需要配置这个参数
      }
    }
  },
  productionSourceMap: false
};
