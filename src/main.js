import Vue from 'vue'
import App from './App.vue'
import router from './routes';
import store from './Store/store';
import VueMaterial from 'vue-material';
import VueResource from 'vue-resource';

import 'vue-material/dist/vue-material.min.css';

Vue.use(VueMaterial);
Vue.use(VueResource);
Vue.http.options.root = '';


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
