const state = {
  userInfo: 'init',
  netError: false,
}

const mutations = {
  setUserInfo: (state, data) => {
    data && (state.userInfo = data);
  },

  setNetError: (state, bool) => {
    state.netError = bool;
  }
}

// const actions = {
// }

export {
  state,
  mutations,
  // actions,
}