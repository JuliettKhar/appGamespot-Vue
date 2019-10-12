import Vue from 'vue'
import App from './App.vue'
import router from './routes';
import store from './Store/store';
import VueMaterial from 'vue-material';
import VueResource from 'vue-resource';
import Vuelidate from 'vuelidate'
import wysiwyg from "vue-wysiwyg";
import 'vue-material/dist/vue-material.min.css';

Vue.use(VueMaterial);
Vue.use(VueResource);
Vue.use(Vuelidate);
Vue.use(wysiwyg, {});

Vue.http.options.root = 'https://appgamespot-90bf1.firebaseio.com/';


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
