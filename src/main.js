import Vue from 'vue'
import App from './App.vue'
import router from './routes';
import VueMaterial from 'vue-material';
import VueResource from 'vue-resource';

import 'vue-material/dist/vue-material.min.css';

Vue.use(VueMaterial);
Vue.use(VueResource);
Vue.http.options.root = '';


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
