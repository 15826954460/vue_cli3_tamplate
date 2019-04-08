## vue cli-3 项目的搭建以及优化

###  1.创建一个vue 项目
##### 1.1 node.js 安装
[中文官网地址](https://nodejs.org/zh-cn/) 根据自己的实际需要进行下载

##### 1.2 安装 @vue/cli
```js
# 全局安装脚手架
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```
###### 1.3 创建项目
```js
vue create my-project
```
###### 1.4 创建配置详解
**关于 preset**
<img  src="https://img-blog.csdnimg.cn/20190329151517435.png"  width=680 height=180/>
有默认和手动两个选项

**择手动的配置**
<img  src="https://img-blog.csdnimg.cn/20190329151919753.png"  width=820 height=190/>

 - Babel  转码
 - TypeScript 根据实际需要是否使用TypeScript进行开发
 - Progress Web App (PWA) Support  关于PWA的相关知识自行度娘就好
 - Router 路由配置
 - Vuex 状态管理
 - CSS  css 预处理器
 - Linter / Formatter 格式检查
 - Unit Testing 单元测试
 - E2E Testing 这个没用过
 
 
**根据上面的配置进一步选择具体的工具**
<img  src="https://img-blog.csdnimg.cn/2019032915295326.png"  width=820 height=125/>
包括：路由的模式，css 预处理器的选择，测试框架的选择，什么时候进行代码检查 ，将预设保存到什么文件，是否将预设作为后期的项目……

以上：项目已经创建完毕，如果文章仅仅是讲解这些，就显得没有意义，接下来我们看看基本的优化
###  2. 基础组件的全局自动化注册
** 实际开发中，我们会根据一些实际的业务需求以及UI的设计，封装属于项目独有的基础组建，eg: 全局的按钮  实际开发中，我们会将所有的按钮分门别类进行统一的封装，无论是处于后期的维护还是提高开发效率都是十分方便的 **
> react-native 开发的同学可以参考  [基于mobx  + react 构建一个60多个页面大型跨平台 react-naive 应用](https://github.com/15826954460/BXStage)  所有组件的封装参见 https://github.com/15826954460/BXStage/blob/master/app/components/ 目录

绝大多数vue项目开发中，我们引入组建方式如下：

```js
import NavBar from "../components/navbar";
import TaskItem from "./component/taskItem.vue";
import PrivilegeItem from "./component/privilegeItem.vue";
import ActiveRule from "./component/activeRule.vue";
import webCallBack from "../../utils/sdk/webCallBack.js";
import androidApi from "../../utils/sdk/androidApi.js";
import languageType from "../../langs/languageType.js";
import webAPI from "../../utils/api/webAPI.js";
```
代码不仅显得臃肿而且难看,关于一些全局注册的组建我们是不必要在每个页面进行引用的，上面的组建引用方式跟适合模块下的组建进行引用，从引用上就进行解耦
关于组建目录：
<img src="https://img-blog.csdnimg.cn/20190329161453849.png" width=170 height=140/>
- globalCom 全局组建
- moduleCom 模块级别的组建
- index.js 全局组建自动注册的js文件
关于组建的提炼以及编写相信大家已经很熟悉了，这里，我们看一下如何进行全局组建注册

全局组建的注册参考 https://cn.vuejs.org/v2/guide/components-registration.html#%E5%9F%BA%E7%A1%80%E7%BB%84%E4%BB%B6%E7%9A%84%E8%87%AA%E5%8A%A8%E5%8C%96%E5%85%A8%E5%B1%80%E6%B3%A8%E5%86%8C

**index.js** 
```js
// components/index.js
import Vue from "vue";
// 自动加载 global 目录下的 .js 结尾的文件 https://webpack.js.org/guides/dependency-management/#requirecontext
const componentsContext = require.context("./global", true, /\.js$/);
componentsContext.keys().forEach(component => {
  const componentConfig = componentsContext(component);
  /**  兼容 import export 和 require module.export 两种规范 */
  const ctrl = componentConfig.default || componentConfig;
  Vue.component(ctrl.name, ctrl);
});
```
**全局注册组建的使用*

```html
<template>
  <div class="home">
    <BtnCom/>  <!-- 直接进行使用，再也不用import进行引入了 -->
    <p>{{$t("international")}}</p>
    <img alt="Vue logo" src="../../assets/logo.png">
    <p>我来自全局的状态管理： {{userInfo}}</p>
    <button @click="changeGlobal">修改全局状态信息</button>
    <p>我来自home模块的状态管理： {{count}}</p>
    <button @click="changeModule">修改home 模块状态信息</button>
  </div>
</template>
```


###  3. 路由的拆分和全局自动化注册
** 实际大型项目的开发中，会有不同的模块，以及每个模下的子路由，将所有的路由都配置卸载 route文件下的index会显得很臃肿，如下：**

```js
export default new Router({
  routes: [
    // 搜索页
    {
      path: '/searchBusiness',
      component: searchBusiness
    },
    // 订单页
    {
      path: '/order',
      component: order,
      children: []
    },
    // 个人主页
    {
      path: '/user',
      component: user,
      children: []
    },
    //  下载APP
    {
      path: '/download',
      component: download
    },
    // 积分商城
    {
      path: '/integral',
      component: integral
    },
    // vip
    {
      path: '/vip',
      component: vip,
      children: []
    },
    // 服务中心页面
    {
      path: '/service',
      component: service,
      children: [ ]
    },
    // 订单主页
    {
      path: '/shop',
      component: shop,
      children: []
    },
    // 确认订单页
    {
      path: '/confirmOrder',
      component: confirmOrder,
      children: []
    }
  ]
})
```

目录结构如如所示：
<img  src="https://img-blog.csdnimg.cn/20190329153911777.png" width=157 height=446/>
在router目录下根据模块新建路由：
**home/index.js**
```js
export default [
  {
    path: '/',
    name: "home",
    component: () => import("@/views/home/index.vue")
  }
]
```
**about/index.js**
```js
export default [
  {
    path: '/about',
    name: 'about',
    component: () => import("@/views/about/index.vue")
  }
]
```
**router/index.js**
添加代码
```js
// 手动注册路由部分
/** -------------以下为手动注册路由的代码------------- */
import homeConfig from "./home";
import aboutConfig from "./about";
const routes = [...homeConfig, ...aboutConfig];
/** -------------以上为手动注册路由的代码------------- */

// 鉴于一个有自我追求的前端攻城狮，对代码高逼格的追求，我们来看看自动化注册路由

/** -------------以下为自动注册路由的代码------------- */ 
// 参见（组建全局自动化注册） https://cn.vuejs.org/v2/guide/components-registration.html#%E5%9F%BA%E7%A1%80%E7%BB%84%E4%BB%B6%E7%9A%84%E8%87%AA%E5%8A%A8%E5%8C%96%E5%85%A8%E5%B1%80%E6%B3%A8%E5%86%8C
let routes = [];
const routerContext = require.context('.', true, /index\.js/)
routerContext.keys().forEach(routeName => {
  if (routeName.startsWith("./index")) return // 排除根index.js
  const routeModule = routerContext(routeName) // get router module object
  routes = [...routes, ...(routeModule.default || routeModule)] // 注册路由
});
/** -------------以上为自动注册路由的代码------------- */

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes
});
```


###  4. vuex状态管理的配置
store目录结构如下：
<img src="https://img-blog.csdnimg.cn/2019032916255335.png" width=160 height=166 />
 - module 为某一模块下的状态
 - 外层的为全局的状态信息 eg: 用户基本信息（登陆状态，用户名……）
具体代码还请 [github 进行查看，建议直接clone 下来进行运行](https://github.com/15826954460/vue_cli3_tamplate)
1. git clone https://github.com/15826954460/vue_cli3_tamplate.git
2. npm i OR yarn install
3. npm run server OR yarn run server

关于vuex的引用

```js
<script>
	import { mapState, mapActions, createNamespacedHelpers } from "vuex"; // 针对全局进行引用
	const {
  		mapState: mapStateHome,
  		mapActions: mapActionsHome
	} = createNamespacedHelpers("home");  // 针对模块进行引用

	// 映射
	export default {
 		computed: {
    		...mapState(["userInfo"]),
    		...mapStateHome(["count"])
    	},
    	methods: {
    		...mapActions(["ac_setUserInfo"]),
    		...mapActionsHome(["at_add"])
    	}
	}
<script/>
```
以上代码已经可以满足我们对于vuex以及命名空间的使用了，但是每一次都这么写，每个页面都写上面的代码，就觉得很蛋疼有木有，于是有了进一步的优化 
src 下创建 mixin/mixin.js
将上面关于 vuex 引用的代码抽离出来放到 mixin.js 文件中
项目使用：
```js
import mixins from '@/mixin/mixin.js'
export default {
  mixins: [mixins],
}
```
同上面的使用进行对比，代码明显减少，代码逼格瞬间提高
> 关于 mixin 的引用，参见  https://cn.vuejs.org/v2/api/#Vue-mixin

###  5. axios 封装
目录如下：
<img src="https://img-blog.csdnimg.cn/20190329165952131.png" width=190 height=73 />
**apiConfig.js 代码如下**

**apiConfig.js**
```js
import axios from "axios";
// 创建axios
let customAxios = axios.create({
  baseURL: "/api/",
  timeout: 60000, // 默认请求超时时间
  // 设置请求头格式：用自定义的覆盖 axios 自带的 'Content-Type': 'application/x-www-form-urlencoded'
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
    Authorization: "" // 权限鉴别字段默认为空,根据实际开发进行配置
  },
  withCredentials: true, // 请求凭证
  // 使用自定义的验签头
  auth: {
    username: "",
    password: ""
  },
  responseType: "json" // 默认的相应数据格式
});

const webApiConfig = {
  startToLoading: 600, // 600ms内网络请求无响应，则展现loading动画
  loadingTimeout: 30000, // loading 动画超时时间
  requestInstanceStack: new Map(), // 请球拦截
  responseInstanceStack: new Map(), // 响应拦截
  instance: customAxios,  /**  自定义一个 axios 实例 */
  /**  post 传参序列化  (添加请求拦截器) */
  setRequestInterceptors: interfaceKey => {
    let _requestInstance = webApiConfig.instance.interceptors.request.use(
      config => {
        /** 根据实际业务写逻辑,比如参数同意进行过滤 */
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
    /** 将请求拦截放到拦截栈中 */
    webApiConfig.requestInstanceStack.set(interfaceKey, _requestInstance);
  },
  /**  移除请求拦截器 */
  removeRequestInterceptors: interfaceKey => {
    webApiConfig.instance.interceptors.request.eject(
      webApiConfig.requestInstanceStack.get(interfaceKey)
    );
  },
  // 设置响应拦截
  setResponseInterceptors: interfaceKey => {
    /** 返回状态判断  (添加响应拦截器) */
    let _responseInstance = webApiConfig.instance.interceptors.response.use(
      /** 请求成功的回掉 */
      res => {
        // 根据http请的响应状态码做一些相应的处理，业务逻辑自己写，这里只是简单的console
        let { status } = res;
        switch (status) {
          case 404:
            console.log("请求路径有误");
            break;
          case 200:
          case 304:
            // 针对重定向和请求ok就返回数据
            return res;
          case 400:
            console.log("请求参数有误，请检查");
            break;
        }
      },
      /** 请求失败的回掉 */
      error => {
        return Promise.reject(error);
      }
    );
    /** 将响应拦截放到拦截栈中 */
    webApiConfig.responseInstanceStack.set(interfaceKey, _responseInstance);
  },
  /**  移除响应拦截器 */
  removeResponseInterceptors: interfaceKey => {
    webApiConfig.instance.interceptors.response.eject(
      webApiConfig.responseInstanceStack.get(interfaceKey)
    );
  }
};

/** 开始请求接口，判断是否展示loading动画，以下关于loading的动画根据公司UI的实际需求进行编写，这种loading功能性的代码建议进行独立的封装，不要和业务有任何的耦合 */
function startLoading() {
  // let _loadInstance = null;
  // // 600ms之后展示loading动画
  // let _startTimer = setTimeout(() => {
  //   _loadInstance = bouncedUtils.loading.show; // 封装的loading动画
  //   _loadInstance();
  //   _startTimer = null;
  // }, webApiConfig.startToLoading);

  // let _overTimer = setTimeout(() => {
  //   bouncedUtils.toast.show({ content: "请求超时\n请检查网络" }); // bouncedUtils
  //   _overTimer = null;
  // }, webApiConfig.loadingTimeout);

  // return [_startTimer, _overTimer, _loadInstance];
}

/** 请求接口结束，关闭loading动画 */
function endLoading() {
  // clearTimeout(startLoading()[0]);
  // clearTimeout(startLoading()[1]);
  // startLoading()[2] instanceof Function && bouncedUtils.loading.hide();
}

/** 启用拦截 */
function startInterceptors(interfaceKey) {
  webApiConfig.setRequestInterceptors(interfaceKey);
  webApiConfig.setResponseInterceptors(interfaceKey);
}

/** 删除拦截和改拦截实例 */
function deleteInterceptors(interfaceKey) {
  webApiConfig.requestInstanceStack.delete(interfaceKey);
  webApiConfig.responseInstanceStack.delete(interfaceKey);
  webApiConfig.removeRequestInterceptors(interfaceKey);
  webApiConfig.removeResponseInterceptors(interfaceKey);
}

/** 
 * 关于取消请求的相关方法
 * 这里的引用场景为，多个tab进行切换的时候  <button>新闻</button><button>图片</button>
 * 假设用户先点击的新闻的tab,在接口还没返回数据的话，又点击图片的tab,这时候就容导致展示给用户的数据出错，所有我们要再进行tab切换的时候取消上一次请求
 * 相关文档参考 https://www.kancloud.cn/yunye/axios/234845
 */


function cancelFetch(cancel, interfaceKey) {
  /** 保存取消请求的实例对象 */
  let _cancelObj = {};
  if (!_cancelObj.cancel) {
    _cancelObj = {
      key: interfaceKey,
      cancel: null
    };
  } else if (_cancelObj.cancel) {
    /** 取消请求,并重置数据 */
    _cancelObj.cancel();
    _cancelObj = {};
  }
  return _cancelObj;
}

// 对 get 请求简易封装
export function getFetch({
  url = "",
  params = {},
  interfaceKey = "",
  cancel = false
} = {}) {
  !cancel && startInterceptors(interfaceKey); // 开启请求拦截
  if (cancelFetch(cancel, interfaceKey).cancel) return;
  /** 这里使用 promise 进行就建议包装是为了更友好的将数据的处理暴露在业务层 */
  return new Promise((resolve, reject) => {
    // startLoading();
    webApiConfig
      .instance({
        method: "get",
        url: url,
        params: params,
        cancelToken:
          (cancel &&
            webApiConfig.instance.CancelToken(function executor(c) {
              // executor 函数接收一个 cancel 函数作为参数
              cancelFetch(cancel, interfaceKey).cancel = c;
            })) ||
          ""
      })
      .then(response => {
        // endLoading();
        deleteInterceptors(interfaceKey); // 删除拦截器以及其实例
        let _code = response.code;
        /** 根据后台返回的状态码进行相应的处理 */
        switch (_code) {
          case 0:
          case 1:
          case 200:
            break;
          default:
            console.log("示例代码都进行返回数据");
        }
        resolve(response.data);
      })
      .catch(error => {
        console.log(`请求当前的接口为 ${url} 错误信息为 ${error}`);
        /**
         *  这里可以配置一些关于操作失败的提示信息：比如获取数据失败等等
         *  或者失败的毁掉函数
         */
        reject(error);
      });
  });
}

// 对 post 请求简易封装
export function postFetch({
  url = "",
  params = {},
  interfaceKey = "",
  cancel = false
} = {}) {
  !cancel && startInterceptors(interfaceKey); // 开启请求拦截
  /** 针对可以取消请求的操作做一些响应的处理 */
  if (cancelFetch(cancel, interfaceKey).cancel) return;
  /** 这里使用 promise 进行就建议包装是为了更友好的将数据的处理暴露在业务层 */
  return new Promise((resolve, reject) => {
    /** 配置请求是否加载动画 */
    webApiConfig
      .instance({
        method: "post",
        url: url,
        data: params,
        cancelToken:
          (cancel &&
            webApiConfig.instance.CancelToken(function executor(c) {
              // executor 函数接收一个 cancel 函数作为参数
              cancelFetch(cancel, interfaceKey).cancel = c;
            })) ||
          ""
      })
      .then(response => {
        // endLoading();
        deleteInterceptors(interfaceKey); // 删除拦截器以及其实例
        let _code = response.code;
        /** 根据后台返回的状态码进行相应的处理 */
        switch (_code) {
          case 0:
          case 1:
          case 200:
            break;
          default:
            console.log("示例代码都进行返回数据");
        }
      })
      .catch(error => {
        /**
         * 这里可以配置一些关于操作失败的提示信息：比如获取数据失败等等
         * reject 方法的参数会传到外部的catch方法，建议关于提示信息统一封装在这里处理，不要放到业务层
         */
        console.log(`请求当前的接口为 ${url} 错误信息为 ${error}`);
        reject(error);
      });
  });
}
```
**webAPI.js**
```js
// webAPI.js
import { getFetch } from "./apiConfig";
/**
 *  针对每个页面的接口进行 请求 api 的配置
 *  cancel 参数用来配置改接口是否支持 取消请求操作(其实不是真的取消了接口的请求，而是将then转为了cache操作)
 * */
export default {
  // nodejs 中文社区的测试接口,根据模块进行划分
  nodejs: {
    // 获取所有主题
    topics: params => {
      return getFetch({
        url: "v1/topics",
        params,
        interfaceKey: "topics"
      });
    },
    // 主题详情
    topicDetail: params => {
      return getFetch({
        url: "v1/topic/5433d5e4e737cbe96dcef312",
        params,
        interfaceKey: "topicDetail"
      });
    }
  }
};
```
**使用**
```js
import API from "@/axios/webAPI.js";
export default {
  mixins: [mixins],
  data() {
    return {};
  },
  components: {},
  computed: {},
  mounted() {
  	// 以nodejs中文社区为例
    API.nodejs.topics().then(res => {
      console.log(22222, res);
    });
  },
}
```

###  6. 关于vue配置文件修改(这里主要是代理的配置)
**vue.config.js**
以简单的配置了一下，代理以及忽略的打包文件，包括代码的压缩，具体参见 https://webpack.docschina.org/
```js
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
    host: "localhost", // 自己电脑ip
    port: 9999, // 自定义端口号
    https: false,
    proxy: {
      // 正则匹配请求url中的字符串，匹配到的进行代理
      "/api/": {
        // 测试环境
        // 开发环境: 'https://cnodejs.org/'
        target: "https://cnodejs.org/", // 代理到的目标地址
        secure: false // 如果是https接口，需要配置这个参数
      }
    }
  },
  productionSourceMap: false
};
```
###  7. 关于vue-i18n
国内市场日趋成熟，公司的业务发展已经达到了相对的饱和，于是目标定准了海外市场，就免不了国际化，这里也顺便送上
目录：
<img src="https://img-blog.csdnimg.cn/20190329174657796.png"  width=160 height=124/>
- en-US.js | zh-CN.js 语言文档
```js
export default {
  international: "international",
}
```
- languageType.js  各国语言枚举字段
- i18nConfig.js 配置文件
**i18nConfig.js**
```js
// i18nConfig.js
import VueI18n from 'vue-i18n'
import enUS from './en-US.js'
import zhCN from './zh-CN.js'
import Vue from 'vue'
Vue.use(VueI18n) /** VueI18n实例化之前要 调用Vue.use(VueI18n)生成实例 */
const LANGUAGE = 'en-US' // 默认英文
export default new VueI18n({
  locale: LANGUAGE,
  /*  'en-US': enUS,  'zh-CN': zhCN,* */
  messages: {
    'en-US': enUS,
    'zh-CN': zhCN
  }
})
```
**main.js 引入**

```js
import i18n from "./i18nConfig/i18nConfig.js";
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  i18n, // 绑定到vue对象
  render: h => h(App)
}).$mount("#app");
```
** 页面使用**
```html
 <p>{{$t("international")}}</p>
```

> 关于 vue-i18n 更多高级的用法，参见 http://kazupon.github.io/vue-i18n/introduction.html


关于vue-cli3脚手架项目的搭建以及优化到此结束

- [vue-cli3搭建模板源码地址](https://github.com/15826954460/vue_cli3_tamplate) 
- [关于vue 创建 typescript 模板](https://github.com/15826954460/vue-ts-template) 

##### 建议down下来进行运行，如果对您有帮助，欢迎star支持，
---

前端技术架构体系（没有链接的后续有时间会）：

- 调用堆栈 https://blog.csdn.net/woleigequshawanyier/article/details/85038675
- 作用域闭包 https://blog.csdn.net/woleigequshawanyier/article/details/85214354
- this全面解析 
- 深浅拷贝的原理 https://blog.csdn.net/woleigequshawanyier/article/details/85331237
- 原型prototype https://blog.csdn.net/woleigequshawanyier/article/details/85338995
- 事件机制、
- Event Loop https://www.jianshu.com/p/12b9f73c5a4f
- Promise机制、
- async / await原理、
- 防抖/节流原理  https://blog.csdn.net/woleigequshawanyier/article/details/85345095
- 模块化详解、
- es6重难点、
- 浏览器熏染原理、
- webpack配置(原理) https://blog.csdn.net/woleigequshawanyier/article/details/85273790
- 前端监控、
- 跨域和安全、
- 性能优化（参见上面性能优化相关）
- VirtualDom原理、
- Diff算法、
- 数据的双向绑定
- TCP协议(三次握手、四次挥手) https://blog.csdn.net/woleigequshawanyier/article/details/85223642
- DNS域名解析 https://blog.csdn.net/woleigequshawanyier/article/details/85222985

其它相关

- 前端学习资料下载 https://blog.csdn.net/woleigequshawanyier/article/details/85274358
- 技术体系分类 https://blog.csdn.net/woleigequshawanyier
- react-native 实战项目学习 https://github.com/15826954460/BXStage
- react-naitve 采坑笔记  https://blog.csdn.net/woleigequshawanyier/article/category/8512330

欢迎各位看官的批评和指正，共同学习和成长