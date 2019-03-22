import { mapState, mapActions, createNamespacedHelpers } from "vuex";
const {
  mapState: mapStateHome,
  mapActions: mapActionsHome
} = createNamespacedHelpers("home");
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