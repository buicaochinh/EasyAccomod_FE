import AuthServices from "../../apis/modules/auth.js";

const state = {
  userData: null
};
const getters = {
  user: state => state.userData
};
const mutations = {
  setUserData(state, user) {
    state.userData = user;
  }
};
const actions = {
  getUserData({ commit }) {
    AuthServices.getUser()
      .then(response => {
        commit("setUserData", response.data);
      })
      .catch(() => {
        localStorage.removeItem("authToken");
      });
  },
  async sendLoginRequest({ commit, dispatch }, data) {
    try {
      commit("setErrors", {}, { root: true });
      const response = await AuthServices.login(data);
      dispatch("getUserData");
      localStorage.setItem("authToken", response.data.access_token);
    } catch (e) {
      console.log("Fail");
    }
  },
  async sendRegisterRequest({ commit, dispatch }, data) {
    commit("setErrors", {}, { root: true });
    const response = await AuthServices.register(data);
    dispatch("getUserData");
    localStorage.setItem("authToken", response.data.access_token);
  },
  async sendLogoutRequest({ commit }) {
    await AuthServices.logout();
    commit("setUserData", null);
    localStorage.removeItem("authToken");
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
