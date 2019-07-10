import axios from 'axios'
// import utils from '@/utils/utils';

const TIME_OUT = 50000 // 请求超时时间
// const LOADING_START = 600; // loading开始时间
// const LOADING_END = 30000; // 动画结束时间

let requestInstanceStack = new Map() // 请球拦截栈
let responseInstanceStack = new Map() // 响应拦截栈
let cancelFetch = new Map() // 取消请求的拦截栈

// let start_timer = null;
// let over_timer = null;

let customAxios = axios.create({
  /**
   * 开发环境：/android-task/ 本地代理到测试环境
   * 正式环境：https://micro.api.wps.com/android-task/
   */
  baseURL: '/server',
  timeout: TIME_OUT, // 默认请求超时时间
  // 设置请求头格式：用自定义的覆盖 axios 自带的 'Content-Type': 'application/x-www-form-urlencoded'
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    Authorization: '' // 权限鉴别字段默认为空
  },
  withCredentials: true, // 请求凭证
  // 使用自定义的验签头
  auth: {
    username: '',
    password: ''
  },
  // params: {
  //   platform: 'PC2019'
  // },
  responseType: 'json' // 默认的相应数据格式
})

/** 添加请求拦截器，eg: 做一些初始化的参数过滤和验证等等 */
let _requestInstance = customAxios.interceptors.request.use(
  config => {
    /** 根据实际业务写逻辑 */
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/** 响应拦截 eg: 做一些数据过滤以及权限限制的处理 */
let _responseInstance = customAxios.interceptors.response.use(
  res => {
    /** 根据实际业务写逻辑 */
    return res
  },
  error => {
    return Promise.reject(error)
  }
)

/** 开始请求接口 */
// function startLoading() {
//   start_timer = setTimeout(() => {
//     // 弹出loading框
//   }, LOADING_START);
//   over_timer = setTimeout(() => {
//     // 超时后的弹框内容，待定
//   }, LOADING_END);
// }

/** 请求接口结束 */
// function endLoading() {
//   clearTimeout(start_timer);
//   clearTimeout(over_timer);
//   start_timer = null;
//   over_timer = null;
// }

/** 启用拦截 */
function setInterceptorsStack (interfaceKey) {
  requestInstanceStack.set(interfaceKey, _requestInstance)
  responseInstanceStack.set(interfaceKey, _responseInstance)
}

/** 删除拦截和改拦截实例 */
function deleteInterceptors (interfaceKey) {
  // 清除拦截栈
  requestInstanceStack.delete(interfaceKey)
  responseInstanceStack.delete(interfaceKey)
  cancelFetch.delete(interfaceKey)
  // 移除拦截
  customAxios.interceptors.request.eject(requestInstanceStack.get(interfaceKey))
  customAxios.interceptors.response.eject(responseInstanceStack.get(interfaceKey))
}

// 对 get 请求简易封装
export function getFetch ({
  url = '',
  params = {},
  interfaceKey = '',
  cancel = false // 判断是否中断请求的参数
  // isLoading = true,
} = {}) {
  if (cancel) {
    cancelFetch.get(interfaceKey)()
    deleteInterceptors(interfaceKey) // 删除拦截器以及其实例
    return
  }
  setInterceptorsStack(interfaceKey) // 请求拦截
  /** 这里使用 promise 进行就建议包装是为了更友好的将数据的处理暴露在业务层 */
  return new Promise((resolve, reject) => {
    // isLoading && startLoading(); // 展示loading
    customAxios({
      method: 'get',
      url: url,
      params: params,
      cancelToken:
        (!cancel &&
          axios.CancelToken(function executor (c) {
            // executor 函数接收一个 cancel 函数作为参数
            cancelFetch.set(interfaceKey, c)
          })) ||
        ''
    })
      .then(response => {
        // endLoading(); // 隐藏loading
        deleteInterceptors(interfaceKey) // 删除拦截器以及其实例
        if (response.status === 200) {
          /** 这里也可以通过制定的成功的毁掉函数来返回数据 */
          return resolve(response.data)
        } else {
          /**
           * 这里的数据处理请根据实际业务来操作
           * 比如指定跳转到某页面
           */
        }
      })
      .catch(error => {
        console.log(`请求当前的接口为 ${url} 错误信息为 ${error}`)
        /**
         *  这里可以配置一些关于操作失败的提示信息：比如获取数据失败等等
         *  或者失败的毁掉函数
         */
        reject(error)
      })
  })
}

// 对 post 请求简易封装
export function postFetch ({
  url = '',
  params = {},
  interfaceKey = '',
  cancel = false
  // isLoading = true,
} = {}) {
  if (cancel) {
    deleteInterceptors(interfaceKey) // 删除拦截器以及其实例
    return cancelFetch.get(interfaceKey)()
  }
  setInterceptorsStack(interfaceKey) // 开启请求拦截
  /** 针对可以取消请求的操作做一些响应的处理 */
  if (cancelFetch(interfaceKey).cancel) return
  /** 这里使用 promise 进行就建议包装是为了更友好的将数据的处理暴露在业务层 */
  return new Promise((resolve, reject) => {
    // isLoading && startLoading(); // 展示loading
    /** 配置请求是否加载动画 */
    customAxios({
      method: 'post',
      url: url,
      data: params,
      cancelToken:
        (!cancel &&
          axios.CancelToken(function executor (c) {
            // executor 函数接收一个 cancel 函数作为参数
            cancelFetch(interfaceKey).cancel = c
          })) ||
        ''
    })
      .then(response => {
        // endLoading();
        deleteInterceptors(interfaceKey) // 删除拦截器以及其实例
        if (response.status === 200) {
          return resolve(response.data)
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
        console.log(`请求当前的接口为 ${url} 错误信息为 ${error}`)
        reject(error)
      })
  })
}
