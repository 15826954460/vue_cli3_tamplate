const state = {
  count: 0
};

const mutations = {
  hmdSetCount(state, value) {
    state.count = value;
  }
};

// const actions = {
// };

export default {
  namespaced: true,
  state,
  mutations,
  // actions,
};
