<template>
  <div class="home">
    <p>国际化: {{$t("international")}}</p>
    <div>
      <button @click="changeGlobal">vuex common 模块 userInfo </button> {{userInfo}}
    </div>
    <div>
      <button @click="changeModule" class="module">vuex home 模块 count </button> {{count}}
    </div>
    <br>
    <Tabs v-model="activityName" @tabs-click="handleTabClick">
      <TabsPane name="home" label="home">home------</TabsPane>
      <TabsPane name="about" label="about">about--------</TabsPane>
      <TabsPane name="about11111" label="about">about11111--------</TabsPane>
      <TabsPane name="sex" label="sex">sex--------</TabsPane>
      <TabsPane name="man11111" label="man">man11111--------</TabsPane>
      <TabsPane name="man" label="man">man--------</TabsPane>
    </Tabs>
    <br>
    <input type="text" v-model="inputVal">
    <Button class="button">按钮</Button>

    <textarea v-model="cureInfo.Symptom" id="symptomTxt" v-autosize></textarea>

  </div>
</template>

<script>
// import API from "@/axios/api.js";
import { mapState, mapMutations, createNamespacedHelpers } from 'vuex';
import util from "@/utils/util";
import { watcher } from '@/mixins/index'

const {
  mapState: mapStateHome,
  mapMutations: mapMutationsHome,
} = createNamespacedHelpers("home");

export default {
  name: 'home-index',
  mixins: [watcher],
  data() {
    return {
      inputVal: 'test',
      unWatchInputVal: null,
      activityName: 'home',
      cureInfo: {
        Symptom: 'jsfdslkfjsd fj 发大沙发地方十九分士大夫精神独立发生激烈的'
      }
    };
  },

  computed: {
    ...mapState(['userInfo', 'netError']), // 全局引入
    ...mapStateHome(['count']), // home模块引入一  // ...mapState('home', ['count']), // home模块的引入方式二
  },

  async mounted() {
    // 接口调用展示
    // const res = await API.nodejs.topics();
    // console.log('nodejs 公共api接口返回', res);

    // watch 监听注册
    this.injectWatchs([{
      watchVal: 'inputVal',
      callback: this.inputValChange,
      unWatchRule: 'clear',
    }, {
      watchVal: 'cureInfo.Symptom',
      callback: this.textareaChange,
      unWatchRule: 'clearText',
    }]);
  },

  methods: {
    ...mapMutations(['setUserInfo']),
    ...mapMutationsHome(['hmSetCount']),

    inputValChange() {
      console.log(1111, Date.now() * Math.random());
    },

    textareaChange() {
      console.log(999999, Date.now() * Math.random());
    },

    changeModule() {
      this.hmSetCount(Math.random() * 1000);
    },

    changeGlobal() {
      this.setUserInfo(util.randomString());
    },

    handleTabClick(name) {
      // this.activityName = name;
    },
  }
};
</script>
<style lang='scss' scoped>
.module {
  cursor: not-allowed;
}

#textarea {
  display: block;
  margin: 0 auto;
  overflow: hidden;
  width: 550px;
  font-size: 14px;
  height: 18px;
  line-height: 24px;
  padding: 2px;
}

textarea {
  outline: 0 none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 8px rgba(82, 168, 236, 0.6);
}
</style>
