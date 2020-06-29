import Vue from "vue";
import Vuex from "vuex";
import { state, mutations } from "./common";
import home from "./module/home";

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  // actions,
  modules: {
    home
  }
});
