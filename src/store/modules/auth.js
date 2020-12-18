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
        if (response) {
          commit("setUserData", response.data);
        } else {
          commit("setUserData", null);
        }
      })
      .catch(() => {
        localStorage.removeItem("authToken");
      });
  },
  async sendLoginRequest({ commit, dispatch }, data) {
    try {
      commit("setErrors", {}, { root: true });
      const response = await AuthServices.login(data);
      if (response.data) {
        dispatch("getUserData");
        localStorage.setItem("authToken", response.data.access_token);
      }
    } catch (e) {
      return e;
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
