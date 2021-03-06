import Vue from "vue";
import Vuex from "vuex";

import AuthStore from "./modules/auth";
import HomeStore from "./modules/home";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    errors: []
  },
  getters: {
    errors: state => state.errors
  },
  mutations: {
    setErrors(state, errors) {
      state.errors = errors;
    }
  },
  actions: {},
  modules: {
    AUTH: AuthStore,
    HOME: HomeStore
  }
});
