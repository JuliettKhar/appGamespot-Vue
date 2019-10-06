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
  },
  getters: {
    isAuth (state) {
      if (state.token) { return true; };
    },
    refreshLoading (state) {
      return state.refreshLoading;
    }
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
  },
}

export default admin;