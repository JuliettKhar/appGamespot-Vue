import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/Home/Index.vue';
import Signin from './components/SignIn/SignIn.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/', component:Home },
    { path: '/signin', component:Signin }
];

export default new VueRouter({
    mode:'history',
    routes,
    scrollBehavior(from,to,savedPosition){
        return {x:0,y:0}
    }
})