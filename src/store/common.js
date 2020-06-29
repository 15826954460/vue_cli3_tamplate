const state = {
  userInfo: 'init',
}

const mutations = {
  setUserInfo: (state, data) => {
    data && (state.userInfo = data);
  },
}

// const actions = {
// }

export {
  state,
  mutations,
  // actions,
}