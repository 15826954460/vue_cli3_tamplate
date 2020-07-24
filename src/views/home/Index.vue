<template>
  <div class="home">
    <p>国际化: {{$t("international")}}</p>
    <div>
      <button @click="changeGlobal">vuex common 模块 userInfo </button> {{userInfo}}
    </div>
    <div>
      <button @click="changeModule">vuex home 模块 count </button> {{count}}
    </div>
    <br>
    <Tabs v-model="activityName" @input="(val) => currentTab = val" @tabs-click="handleTabClick">
      <TabsPane name="home" label="home">home------</TabsPane>
      <TabsPane name="about" label="about">about--------</TabsPane>
    </Tabs>
    <br>
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
      callback: this.inputValChange,
      unWatchRule: 'clear',
      immediate: true,
    });
  },

  methods: {
    ...mapMutations(['setUserInfo']),
    ...mapMutationsHome(['hmSetCount']),

    inputValChange() {
      console.log(1111, Date.now() * Math.random());
      console.log(797979, this.activityName);
    },

    changeModule() {
      this.hmSetCount(Math.random() * 1000);
    },

    changeGlobal() {
      this.setUserInfo(util.randomString());
    },

    handleTabClick(name) {
      // this.activityName = name;
      console.log(2222, name, this.activityName);
    }
  }
};
</script>
<style lang='scss' scoped>
</style>
