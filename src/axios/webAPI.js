import { getFetch } from "./apiConfig";
/**
 *  针对每个页面的接口进行 请求 api 的配置
 *  cancel 参数用来配置改接口是否支持 取消请求操作(其实不是真的取消了接口的请求，而是将then转为了cache操作)
 * */
export default {
  // nodejs 中文社区的测试接口
  nodejs: {
    // 获取任务列表  /android-task/list
    topics: params => {
      return getFetch({
        url: "v1/topics",
        params,
        interfaceKey: "topics"
      });
    }
  }
};
