<template>
  <div class="home">
    <p>国际化: {{$t("international")}}</p>
    <div>
      <button @click="changeGlobal">vuex common 模块 userInfo </button> {{userInfo}}
    </div>
    <div>
      <button @click="changeModule">vuex home 模块 count </button> {{count}}
    </div>
    <Tabs v-model="activityName" @tabs-click="handleTabClick">
      <TabsNav name="home" label="home"></TabsNav>
      <TabsNav name="about" label="about"></TabsNav>
    </Tabs>
    <input type="text" v-model="inputVal">
  </div>
</template>

<script>
// import API from "@/axios/api.js";
import { mapState, mapMutations, createNamespacedHelpers } from 'vuex';
import common from '@/mixin/common';
import util from "@/utils/util";

const {
  mapState: mapStateHome,
  mapMutations: mapMutationsHome,
} = createNamespacedHelpers("home");

export default {
  name: 'home-index',
  mixins: [common],
  data() {
    return {
      inputVal: 'test',
      unWatchInputVal: null,
      activityName: 'home',
    };
  },

  components: {},

  computed: {
    ...mapState(['userInfo', 'netError']), // 全局引入
    ...mapStateHome(['count']), // home模块引入一  // ...mapState('home', ['count']), // home模块的引入方式二
  },

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
    ...mapMutations(['setUserInfo']),
    ...mapMutationsHome(['hmSetCount']),
    inputValChange() {
      console.log(1111, Date.now() * Math.random());
    },

    changeModule() {
      this.hmSetCount(Math.random() * 1000);
    },

    changeGlobal() {
      this.setUserInfo(util.randomString());
    },

    handleTabClick(tab, event) {
      console.log(tab, event);
      // this.activityName = tab;
      console.log(2222, this.activityName);
    }
  }
};
</script>
<style lang='scss' scoped>
</style>
