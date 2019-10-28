import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './Store/store';

import Home from './components/Home/Index.vue';
import Signin from './components/SignIn/SignIn.vue';
import Dashboard from './components/Dashboard/Dashboard.vue';
import MainDashboard from './components/Dashboard/DashboardMain.vue';
import AddPosts from './components/Dashboard/AddPosts.vue';
import ListPosts from './components/Dashboard/ListPosts.vue';
import Post from './components/Post/Post.vue';
import NotFound from './components/404/NotFound.vue';

Vue.use(VueRouter);

const authGuard = {
    beforeEnter: (to, from, next) => {
        const redirect = () => {
            if (store.state.admin.token) {
							if (to.path === '/signin') {
								next('/dashboard');
							} else {
								next();
							}
            } else {
							if (to.path === '/signin') {
								next();
							} else {
								next('/');
							}
            }
        }

        if (store.state.admin.refreshLoading) {
            store.watch( (state, getters) => getters['admin/refreshLoading'], () => {
							redirect();
						});
        } else {
					redirect();
        }
    }
};

const routes = [
    { path: '/', component: Home },
    { path: '/signin', component: Signin, ... authGuard },
    { path: '/dashboard', component: Dashboard, children: [
			{path: '/', component: MainDashboard},
			{path: 'add_posts', component: AddPosts},
			{path: 'list_posts', component: ListPosts},
        ], ... authGuard},
    { path: '/post/:id', component: Post },
    { path: '*', component: NotFound }
];

export default new VueRouter({
    mode:'history',
    routes,
    scrollBehavior(from,to,savedPosition){
        return {x:0,y:0}
    }
})