<template>
  <div class="home">
    <BtnCom/>
    <p>{{$t("taskCenter")}}</p>
    <img alt="Vue logo" src="../../assets/logo.png">
    <p>我来自全局的状态管理： {{userInfo}}</p>
    <button @click="changeGlobal">修改全局状态信息</button>
    <p>我来自home模块的状态管理： {{count}}</p>
    <button @click="changeModule">修改home 模块状态信息</button>
  </div>
</template>

<script>
import { mapState, mapActions, createNamespacedHelpers } from "vuex";
const {
  mapState: mapStateHome,
  mapActions: mapActionsHome
} = createNamespacedHelpers("home");
export default {
  data() {
    return {};
  },

  components: {},

  computed: {
    ...mapState(["userInfo"]),
    ...mapStateHome(["count"])
  },

  mounted() {},

  methods: {
    ...mapActions(["ac_setUserInfo"]),
    ...mapActionsHome(["at_add"]),
    changeModule() {
      this.at_add(Math.random() * 1000);
    },
    changeGlobal() {
      this.ac_setUserInfo(this.randomString());
    },
    // 生成随机字符串
    randomString(len) {
      len = len || 32;
      /** 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1 */
      let chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
      let maxPos = chars.length;
      let pwd = "";
      for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd;
    }
  }
};
</script>
<style lang='scss' scoped>
</style>