/* eslint-disable */ 
import Vue from 'vue';
import router from '../../routes';


const FbAuth = 'https://identitytoolkit.googleapis.com/v1';
const ApiKey = 'AIzaSyA5hAOyS0__JHu9na_EdaF4bL8ElUsKLsE';

const admin = {
  namespaced: true,
  state: {
    token: null,
    refresh: null,
    authFailed: false,
    refreshLoading: true,
    addpost: false,
    imageUpload: null,
    adminPosts: null,
  },
  getters: {
    isAuth (state) {
      if (state.token) { return true; };
    },
    refreshLoading (state) {
      return state.refreshLoading;
    },
    addPostStatus (state) {
      return state.addpost;
    },
    imgUpload (state) {
      return state.imageUpload;
    },
    getAdminPost (state) {
      return state.adminPosts;
    },
  },
  mutations: {
    authUser (state, authData) {
      state.token = authData.idToken;
      state.refresh = authData.refreshToken;

      if (authData.type === 'signIn') {
        router.push('/dashboard');
      }
    },
    authFailed (state, type) {
        if (type === 'reset') {
          state.authFailed = false;
        } else {
          state.authFailed = true;
        }
    },
    logoutUser (state) {
      state.token = null;
      state.refresh = null;
      localStorage.removeItem('token');
      localStorage.removeItem('refresh');
      router.push('/');
    },
    refreshLoading (state) {
      state.refreshLoading = false;
    },
    addPosts (state) {
      state.addpost = true;
    },
    clearAddedPost (state) {
      state.addpost = false;
    },
    imageUpload (state, image) {
      state.imageUpload = image.secure_url;
    },
    clearImageUpload (state) {
      state.imageUpload = null;
    },
    getAdminPosts (state, posts) {
      state.adminPosts = posts;
    }

  },
  actions: {
    signIn ( {commit}, payload ) {
      Vue.http.post(`${FbAuth}/accounts:signInWithPassword?key=${ApiKey}`, {
        ...payload,
        returnSecureToken: true
      })
      .then( resp => resp.json())
      .then( authData => {
        commit('authUser', {
          ...authData,
          type: 'signIn'
        });
        localStorage.setItem('token', authData.idToken);
        localStorage.setItem('refresh', authData.refreshToken);
      })
      .catch( err => {
        commit('authFailed')
      })
    },
    refreshToken ( {commit} ) {
      const refreshToken = localStorage.getItem('refresh');
      if (refreshToken) {
        Vue.http.post(`https://securetoken.googleapis.com/v1/token?key=${ApiKey}`, {
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        })
        .then( resp => resp.json())
        .then( authData => {
          commit('authUser', {
            idToken: authData.id_token,
            refreshToken: authData.refresh_token,
            type: 'refresh'
          });
          commit('refreshLoading');
          localStorage.setItem('token', authData.id_token);
          localStorage.setItem('refresh', authData.refresh_token);
        })
      } else {
        commit('refreshLoading');
      }
    },
    addPost ({commit, state}, payload) {
      Vue.http.post(`posts.json?auth=${state.token}`, payload)
        .then(response => response.json())
        .then(response => {
          commit('addPosts');
          setTimeout( () => {
            commit('clearAddedPost');
          }, 3000);
        })
    },
    imageUpload ({commit}, file) {
      const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/df1otieyk/image/upload';
      const cloudinaryPreset = 'bjwrko6v';
      let formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', cloudinaryPreset);

      Vue.http.post(cloudinaryUrl, formData, {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        }
      })
      .then(resp => resp.json())
      .then(resp => {
        commit('imageUpload', resp);
      })
    },
    getAdminPosts ({commit}) {
      Vue.http.get('posts.json')
        .then(resp => resp.json())
        .then(resp => {
          const posts = [];
            for(let key in resp) {
              posts.push({
                ...resp[key],
                id: key
              })
            }
            commit('getAdminPosts', posts.reverse());
        });
    },
    deletePost ({commit, state}, payload) {
      Vue.http.delete(`posts/${payload}.json?auth=${state.token}`)
        .then( resp => {
         let newPosts = [];
         state.adminPosts.forEach(post => {
           if (post.id != payload) {
            newPosts.push(post);
           }
         });
         commit('getAdminPosts', newPosts);
        })
    }
  },
}

export default admin;