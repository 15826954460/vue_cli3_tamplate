<template>
  <div class="home">
    <Toast/>
    <p>{{$t("international")}}</p>
    <p>我来自全局的状态管理： {{userInfo}}</p>
    <button @click="changeGlobal">修改全局状态信息</button>
    <p>我来自home模块的状态管理： {{count}}</p>
    <button @click="changeModule">修改home 模块状态信息</button>
  </div>
</template>

<script>
import store from "@/mixin/store.js";
import API from "@/axios/api.js";
import util from "@/utils";

export default {
  mixins: [store],
  data() {
    return {};
  },
  components: {},

  computed: {},

  mounted() {
    API.nodejs.topics().then(res => {
      console.log('nodejs 公共api接口返回', res);
    });
  },

  methods: {
    changeModule() {
      this.hmdSetCount(Math.random() * 1000);
    },

    changeGlobal() {
      this.setUserInfo(util.randomString());
    },
  }
};
</script>
<style lang='scss' scoped>
</style>