import Vue from 'vue'
import App from './App.vue'
import router from './routes';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';

Vue.use(VueMaterial);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
