const state = {
  count: 0
};

const mutations = {
  hmSetCount(state, value) {
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
