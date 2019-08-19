import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '*',
            redirect: '/'
        },
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/city',
            name: 'city',
            component: () => import(/* webpackChunkName: "city" */ './views/City.vue')
        },
        {
            path: '/detail/:id',
            name: 'detail',
            component: () => import(/* webpackChunkName: "detail" */ './views/Detail.vue')
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})
