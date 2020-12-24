import HomeServices from "../../apis/modules/home";

const state = {
  categories: [],
  favorites: []
};

const getters = {
  categories: () => state.categories,
  favorites: () => state.favorites
};

const mutations = {
  setCategories(state, payload) {
    state.categories = payload;
  },
  setFavorites(state, payload) {
    state.favorites = payload;
  }
};

const actions = {
  getCategory({ commit }) {
    HomeServices.getCategory().then(response => {
      commit("setCategories", response.data.room_types);
    });
  },
  getFavorites({ commit }) {
    HomeServices.getFavPost().then(response => {
      commit("setFavorites", response.data.fav_post);
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
