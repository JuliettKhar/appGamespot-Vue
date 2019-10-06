import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './Store/store';

import Home from './components/Home/Index.vue';
import Signin from './components/SignIn/SignIn.vue';
import Dashboard from './components/Dashboard/Dashboard.vue';

Vue.use(VueRouter);

const authGuard = {
    beforeEnter: (to, from, next) => {
        if (store.state.admin.token) {
            next();
        } else {
            next('/');
        }
    }
};

const routes = [
    { path: '/', component: Home },
    { path: '/signin', component: Signin },
    { path: '/dashboard', component: Dashboard, children: [], ... authGuard},
];

export default new VueRouter({
    mode:'history',
    routes,
    scrollBehavior(from,to,savedPosition){
        return {x:0,y:0}
    }
})