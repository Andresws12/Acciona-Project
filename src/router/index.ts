import VueRouter, { RouteConfig } from 'vue-router';
import Vue from 'vue';

import Home from '../views/UserList.vue';
import CurrentUser from '../views/CurrentUser.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/user',
        name: 'User',
        component: CurrentUser,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
