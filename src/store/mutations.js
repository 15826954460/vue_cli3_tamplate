export default {
  setUserInfo: (state, data) => {
    data && (state.userInfo = data);
  }
}