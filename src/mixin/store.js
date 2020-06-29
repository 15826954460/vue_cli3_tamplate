/**
 * @author 柏运送
 * @date 2020-06-29 17:07:45
 * @description vuex 统一管理
*/
import { mapState, mapMutations, /* mapActions */ createNamespacedHelpers } from "vuex";

const {
  mapState: mapStateHome,
  // mapActions: mapActionsHome,
  mapMutations: mapMutationsHome,
} = createNamespacedHelpers("home");

// 局部混入的用法
export default {
  computed: {
    ...mapState(["userInfo"]),
    ...mapStateHome(["count"])
  },
  
  methods: {
    ...mapMutations(['setUserInfo']),
    // ...mapActions([]),
    ...mapMutationsHome(['hmdSetCount']),
    // ...mapActionsHome(),
  }
}