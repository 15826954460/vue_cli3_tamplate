const CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
  /**
   * baseUrl 为活动名,上线后正式地址为 https://activity.wps.com/xxx
   * 上线时需要把 baseUrl 设置为 CDN 地址 https://d3nwz1fzrto4dz.cloudfront.net/xxx
   */
  // 
  publicPath: "", // 本地调试，默认为空
  chainWebpack: config => {
    // #region 忽略生产环境打包的文件
    config.externals({
      vue: "Vue",
      axios: "axios",
      "vue-router": "VueRouter",
      vuex: "Vuex",
      "vue-i18n": "VueI18n"
      // 'element-ui': 'ELEMENT',
    });
    /**
     * cdn 常用的第三方库不用打包，直接从线上拉去，减少包的体积
     * 没有cdn的时候就直接在页面中采用 script 标签进行引入
     * 参见 pubilc/index.heml
     */
    const cdn = {
      css: [
        // element-ui css
        // "//unpkg.com/element-ui/lib/theme-chalk/index.css"
      ],
      js: [
        // vue
        "//cdn.staticfile.org/vue/2.5.22/vue.min.js",
        // vue-router
        "//cdn.staticfile.org/vue-router/3.0.2/vue-router.min.js",
        // vuex
        "//cdn.staticfile.org/vuex/3.1.0/vuex.min.js",
        // axios
        "//cdn.staticfile.org/axios/0.19.0-beta.1/axios.min.js"
        // element-ui js
        // "//unpkg.com/element-ui/lib/index.js"
      ]
    };
    config.plugin("html").tap(args => {
      args[0].cdn = cdn;
      return args;
    });
    // #endregion
    // 文件压缩，一般情况下后端都没配置，这里也需要后端进行文件配置
    if (process.env.NODE_ENV === "production") {
      // #region 启用GZip压缩
      config
        .plugin("compression")
        .use(CompressionPlugin, {
          asset: "[path].gz[query]",
          algorithm: "gzip",
          test: new RegExp("\\.(" + ["js", "css"].join("|") + ")$"),
          threshold: 10240,
          minRatio: 0.8,
          cache: true
        })
        .tap(args => {});
    }
  },
  // 配置代理
  devServer: {
    host: "10.229.27.128", // 自己电脑ip
    port: 9999, // 自定义端口号
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
