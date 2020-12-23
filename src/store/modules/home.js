import HomeServices from "../../apis/modules/home";

const state = {
  categories: []
};

const getters = {
  categories: () => state.categories
};

const mutations = {
  setCategories(state, payload) {
    state.categories = payload;
  }
};

const actions = {
  getCategory({ commit }) {
    HomeServices.getCategory().then(response => {
      commit("setCategories", response.data.room_types);
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
