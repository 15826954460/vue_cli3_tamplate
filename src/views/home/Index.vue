<template>
  <div class="home">
    <p @click="router.push({ path: '/about' })"> changeroute </p>
    <p>{{$t("international")}}</p>
    <p>我来自全局的状态管理： {{userInfo}}</p>
    <button @click="changeGlobal">修改全局状态信息</button>
    <p>我来自home模块的状态管理： {{count}}</p>
    <button @click="changeModule">修改home 模块状态信息</button>
    <button @click="changeData">{{ data.item.count }}</button>
    <input type="text" v-model="inputVal">
  </div>
</template>

<script>
import store from "@/mixin/store";
import common from '@/mixin/common'
// import API from "@/axios/api.js";
import util from "@/utils/util";

export default {
  mixins: [store, common],
  data() {
    return {
      data: {
        item: {
          count: 6
        },
      },
      inputVal: 'test',
      unWatchInputVal: null,
    };
  },

  components: {},

  computed: {},

  async mounted() {
    // 接口调用展示
    // const res = await API.nodejs.topics();
    // console.log('nodejs 公共api接口返回', res);

    // watch 监听注册
    this.injectWatchs({ 
      watchVal: 'inputVal',
      cb: this.inputValChange,
      unWatchRule: 'clear',
      immediate: true,
    });
  },

  methods: {
    inputValChange() {
      console.log(1111, Date.now() * Math.random());
    },
  
    changeModule() {
      this.hmdSetCount(Math.random() * 1000);
    },

    changeGlobal() {
      this.setUserInfo(util.randomString());
    },

    changeData()  {
      this.data.item.count += 1;
    }
  }
};
</script>
<style lang='scss' scoped>
</style>