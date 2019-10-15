/* eslint-disable */ 
import Vue from 'vue';
import router from '../../routes';

const posts = {
  namespaced: true,
  state: {
    homePosts: null
  },
  getters: {
    getPosts (state) {
      return state.homePosts;
    }
  },
  mutations: {
    getAllPosts (state, pots) {
      state.homePosts = pots;
    },
  },
  actions: {
    getAllPosts ({commit}, payload) {
      Vue.http.get(`posts.json?orderBy="$key"&limitToLast=${payload.limit}`)
      .then(response => response.json())
      .then(response => {
        const posts = [];
        for(let key in response) {
          posts.push({
            ...response[key],
            id: key
          })
        };
        commit('getAllPosts', posts.reverse());
      })
    }
  },
};

export default posts;