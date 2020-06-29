/**
 * @author 柏运送
 * @date 2020-06-29 16:55:47
 * @description api
*/
import { getFetch } from "./config";

export default {
  // nodejs 中文社区的测试接口
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
