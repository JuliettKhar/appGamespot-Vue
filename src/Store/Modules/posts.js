/* eslint-disable */ 
import Vue from 'vue';
import router from '../../routes';

const posts = {
  namespaced: true,
  state: {
    homePosts: null,
    post: null
  },
  getters: {
    getPosts (state) {
      return state.homePosts;
    },
    getOnePost (state) {
      return state.post;
    }
  },
  mutations: {
    getAllPosts (state, pots) {
      state.homePosts = pots;
    },
    setPost (state, post) {
      state.post = post;
    },
    clearPost (state) {
      state.post = null;
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
    },
    getPost ({commit}, payload) {
      Vue.http.get(`posts.json?orderBy="$key"&equalTo="${payload}"`)
      .then(resp => resp.json())
      .then(resp => {
        let post = {};
        for (let key in resp) {
          post = {
            ...resp[key]
          }
        };
        commit('setPost', post);
      })
    },
  },
};

export default posts;