import Vue from "vue";
import Vuex from "vuex";
import state from "./states";
import actions from "./actions";
import mutations from "./mutations";
import home from "./module/home.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    home
  }
});
