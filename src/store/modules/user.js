export default {
  namespaced: true,
  state() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      id: "",
    };
  },
  mutations: {
    setUserData(state, payload) {
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.email = payload.email;
      state.id = payload.id;
    },
    clearUserData(state) {
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.id = "";
    },
  },
  actions: {},
  getters: {
    id(state) {
      return state.id;
    },
    firstName(state) {
      return state.firstName;
    },
    lastName(state) {
      return state.lastName;
    },
    fullName(state) {
      return state.firstName + " " + state.lastName;
    },
    email(state) {
      return state.email;
    },
  },
};
