const state = {
  count: 0
};

const mutations = {
  // 设置模板信息
  mt_add(state, value) {
    state.count = value;
  }
};

const actions = {
  at_add: ({ commit }, value) => {
    commit("mt_add", value);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
