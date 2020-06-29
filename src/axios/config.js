import axios from 'axios'
/**
 * @author 柏运送
 * @date 2020-06-29 16:56:20
 * @description axios 简易封装
*/

const TIME_OUT = 1000 * 60; // 请求超时时间

let requestInstanceStack = new Map(); // 请球拦截栈
let responseInstanceStack = new Map(); // 响应拦截栈
let cancelFetch = new Map(); // 取消请求的拦截栈

let customAxios = axios.create({
  baseURL: '/api',
  timeout: TIME_OUT, // 默认请求超时时间
  // 设置请求头格式：用自定义的覆盖 axios 自带的 'Content-Type': 'application/x-www-form-urlencoded'
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    Authorization: '' // 权限鉴别字段默认为空
  },
  withCredentials: true, // 请求凭证
  auth: {}, // 使用自定义的验签头
  params: {}, // 所有请求携带参数
  responseType: 'json', // 默认的相应数据格式
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
} = {}) {
  if (cancel) {
    cancelFetch.get(interfaceKey)()
    deleteInterceptors(interfaceKey) // 删除拦截器以及其实例
    return
  }
  setInterceptorsStack(interfaceKey) // 请求拦截
  return new Promise((resolve, reject) => {
    customAxios({
      method: 'get',
      url: url,
      params: params,
      cancelToken: (!cancel && axios.CancelToken(function executor (c) {
        cancelFetch.set(interfaceKey, c)
      })),
    }).then(response => {
      deleteInterceptors(interfaceKey) // 删除拦截器以及其实例
      if (response.status === 200) {
        return resolve(response.data)
      } else {
        /**
         * 这里的数据处理请根据实际业务来操作
         * 比如指定跳转到某页面
         */
      }
    }).catch(error => {
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
  cancel = false,
  headers = {},
} = {}) {
  if (cancel) {
    deleteInterceptors(interfaceKey) // 删除拦截器以及其实例
    return cancelFetch.get(interfaceKey)()
  }
  setInterceptorsStack(interfaceKey) // 开启请求拦截
  return new Promise((resolve, reject) => {
    customAxios({
      headers,
      method: 'post',
      url: url,
      data: params,
      cancelToken: (!cancel && axios.CancelToken(function executor (c) {
        cancelFetch.set(interfaceKey, c)
      })),
    }).then(response => {
      deleteInterceptors(interfaceKey) // 删除拦截器以及其实例
      if (response.status === 200) {
        return resolve(response.data)
      } else {
        /**
         * 这里的数据处理请根据实际业务来操作
         * 比如指定跳转到某页面
         */
      }
    }).catch(error => {
      /**
       * 这里可以配置一些关于操作失败的提示信息：比如获取数据失败等等
       * reject 方法的参数会传到外部的catch方法，建议关于提示信息统一封装在这里处理，不要放到业务层
       */
      console.log(`请求当前的接口为 ${url} 错误信息为 ${error}`)
      reject(error)
    });
  });
}
