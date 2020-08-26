<template>
  <div class="home">

    <!-- <TestCom>
      <template v-slot:default="{ exampleProp }">
        hello, {{ exampleProp }}
      </template>
    </TestCom> -->

    <Item :data="tests[id]" class="large">
      <p v-slot:foo>  first </p>
      <p>second</p>
    </Item>
    <button @click="next">下一题</button>

  </div>
</template>

<script>
// import API from "@/axios/api.js";
// import { mapState, mapMutations, createNamespacedHelpers } from 'vuex';
// import util from "@/utils/util";
import { watcher } from '@/mixins/index';
import Item from '../test/Test'

// const {
//   mapState: mapStateHome,
//   mapMutations: mapMutationsHome,
// } = createNamespacedHelpers("home");

export default {
  name: 'home-index',
  mixins: [watcher],
  data() {
    return {
      data: '我是函数式组件',
      id: 1,
      tests: {
        1: `第一道题`,
        2: `第二道题`,
        3: `第三道题`
      }
    };
  },

  components: {
    Item
  },

  computed: {
    // ...mapState(['userInfo', 'netError']), // 全局引入
    // ...mapStateHome(['count']), // home模块引入一  // ...mapState('home', ['count']), // home模块的引入方式二
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
    next() {
      ++this.id
    },
  }
};
</script>
<style lang='scss' scoped>
.module {
  cursor: not-allowed;
}

.textarea {
  outline: 0 none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 8px rgba(82, 168, 236, 0.6);
  max-height: 30px;
  width: 300px;
}

/* 滚动条框设置 */
.textarea::-webkit-scrollbar {
  width: 4px;
  background-color: rgb(182, 214, 226);
}

/* 滚动条的设置 */
.textarea::-webkit-scrollbar-thumb {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  background-color: skyblue;
  border-radius: 2px;
}
</style>
