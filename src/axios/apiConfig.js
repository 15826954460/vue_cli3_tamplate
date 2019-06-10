import axios from "axios";

const TIME_OUT = 50000; // 请求超时时间
const LOADING_START = 600; // loading开始时间
const LOADING_END = 30000; // 动画结束时间

let requestInstanceStack = new Map(); // 请球拦截栈
let responseInstanceStack = new Map(); // 响应拦截栈
let cancelFetch = new Map(); // 取消请求的拦截栈


let customAxios = axios.create({
  /**
   * 开发环境：/android-task/ 本地代理到测试环境
   * 正式环境：https://micro.api.wps.com/android-task/
   */
  baseURL:
    process.env.NODE_ENV === "development"
      ? "/android-task/"
      : "https://micro.api.wps.com/android-task/",
  timeout: TIME_OUT, // 默认请求超时时间
  // 设置请求头格式：用自定义的覆盖 axios 自带的 'Content-Type': 'application/x-www-form-urlencoded'
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
    Authorization: "" // 权限鉴别字段默认为空
  },
  withCredentials: true, // 请求凭证
  // 使用自定义的验签头
  auth: {
    username: "",
    password: ""
  },
  responseType: "json" // 默认的相应数据格式
});

/**  post 传参序列化  (添加请求拦截器) */
function setRequestInterceptors(interfaceKey) {
  let _requestInstance = customAxios.interceptors.request.use(
    config => {
      /** 根据实际业务写逻辑 */
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  /** 将请求拦截放到拦截栈中 */
  requestInstanceStack.set(interfaceKey, _requestInstance);
}
/**  移除请求拦截器 */
function removeRequestInterceptors(interfaceKey) {
  customAxios.interceptors.request.eject(
    requestInstanceStack.get(interfaceKey)
  );
}
// 设置响应拦截
function setResponseInterceptors(interfaceKey) {
  /** 返回状态判断  (添加响应拦截器) */
  let _responseInstance = customAxios.interceptors.response.use(
    res => {
      /** 根据实际业务写逻辑 */
      return res;
    },
    error => {
      return Promise.reject(error);
    }
  );
  /** 将响应拦截放到拦截栈中 */
  responseInstanceStack.set(interfaceKey, _responseInstance);
}
/**  移除响应拦截器 */
function removeResponseInterceptors(interfaceKey) {
  customAxios.interceptors.response.eject(
    responseInstanceStack.get(interfaceKey)
  );
}

/** 开始请求接口 */
function startLoading() {
  let _loadInstance = null;
  let _startTimer = setTimeout(() => {
    // 弹出loading框，方法待写
    _startTimer = null;
  }, LOADING_START);
  let _overTimer = setTimeout(() => {
    // 超时后的弹框内容，待定
    _overTimer = null;
  }, LOADING_END);
  return [_startTimer, _overTimer, _loadInstance];
}

/** 请求接口结束 */
function endLoading() {
  clearTimeout(startLoading()[0]);
  clearTimeout(startLoading()[1]);
}

/** 启用拦截 */
function startInterceptors(interfaceKey) {
  setRequestInterceptors(interfaceKey);
  setResponseInterceptors(interfaceKey);
}

/** 删除拦截和改拦截实例 */
function deleteInterceptors(interfaceKey) {
  // 清除拦截栈
  requestInstanceStack.delete(interfaceKey);
  responseInstanceStack.delete(interfaceKey);
  cancelFetch.delete(interfaceKey);
  // 移除拦截
  removeRequestInterceptors(interfaceKey);
  removeResponseInterceptors(interfaceKey);
}

// 对 get 请求简易封装
export function getFetch({
  url = "",
  params = {},
  interfaceKey = "",
  cancel = false, // 判断是否中断请求的参数
} = {}) {
  if (cancel) {
    cancelFetch.get(interfaceKey)();
    deleteInterceptors(interfaceKey); // 删除拦截器以及其实例
    return
  }
  startInterceptors(interfaceKey); // 请求拦截
  /** 这里使用 promise 进行就建议包装是为了更友好的将数据的处理暴露在业务层 */
  return new Promise((resolve, reject) => {
    startLoading(); // 展示loading
    customAxios({
      method: "get",
      url: url,
      params: params,
      cancelToken:
        (!cancel && customAxios.CancelToken(function executor(c) {
          // executor 函数接收一个 cancel 函数作为参数
          cancelFetch.set(interfaceKey, c)
        })) || ""
    })
      .then(response => {
        endLoading(); // 隐藏loading
        deleteInterceptors(interfaceKey); // 删除拦截器以及其实例
        if (response.status === 200) {
          /** 这里也可以通过制定的成功的毁掉函数来返回数据 */
          return resolve(response.data);
        } else {
          /**
           * 这里的数据处理请根据实际业务来操作
           * 比如指定跳转到某页面
           */
        }
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
  if (cancel) {
    deleteInterceptors(interfaceKey); // 删除拦截器以及其实例
    return cancelFetch.get(interfaceKey)();
  }
  startInterceptors(interfaceKey); // 开启请求拦截
  /** 针对可以取消请求的操作做一些响应的处理 */
  if (cancelFetch(interfaceKey).cancel) return;
  /** 这里使用 promise 进行就建议包装是为了更友好的将数据的处理暴露在业务层 */
  return new Promise((resolve, reject) => {
    /** 配置请求是否加载动画 */
    customAxios({
      method: "post",
      url: url,
      data: params,
      cancelToken:
        (!cancel && customAxios.CancelToken(function executor(c) {
          // executor 函数接收一个 cancel 函数作为参数
          cancelFetch(interfaceKey).cancel = c;
        })) || ""
    })
      .then(response => {
        // endLoading();
        deleteInterceptors(interfaceKey); // 删除拦截器以及其实例
        if (response.status === 200) {
          return resolve(response.data);
        } else {
          /**
           * 这里的数据处理请根据实际业务来操作
           * 比如指定跳转到某页面
           */
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
