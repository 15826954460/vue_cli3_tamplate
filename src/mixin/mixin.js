// import Vue from 'vue'
import { mapState, mapActions, createNamespacedHelpers } from "vuex";
const {
  mapState: mapStateHome,
  mapActions: mapActionsHome
} = createNamespacedHelpers("home");

// 局部混入的用法
export default {
  computed: {
    ...mapState(["userInfo"]),
    ...mapStateHome(["count"])
  },
  methods: {
    ...mapActions(["ac_setUserInfo"]),
    ...mapActionsHome(["at_add"])
  }
}