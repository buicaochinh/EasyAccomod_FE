import HomeServices from "../../apis/modules/home";

const state = {
  categories: [],
  favorites: [],
  nearestPost: null
};

const getters = {
  categories: () => state.categories,
  favorites: () => state.favorites,
  nearestPost: () => state.nearestPost
};

const mutations = {
  setCategories(state, payload) {
    state.categories = payload;
  },
  setFavorites(state, payload) {
    state.favorites = payload;
  },
  setNearestPost(state, payload) {
    state.nearestPost = payload;
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
  },
  setCurrentPost({ commit }, data) {
    commit("setNearestPost", data);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
