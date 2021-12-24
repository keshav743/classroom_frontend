export default {
  namespaced: true,
  state() {
    return {
      loginError: null,
      signupError: null,
    };
  },
  mutations: {
    setLoginError(state, payload) {
      state.loginError = payload.err;
    },
    setSignupError(state, payload) {
      state.signupError = payload.err;
    },
  },
  getters: {
    loginError(state) {
      return state.loginError;
    },
    signupError(state) {
      return state.signupError;
    },
  },
};
