import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'
import System from '../components/System'
import store from '../store'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'system',
            redirect: '/system'
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/system',
            name: 'system',
            component: System
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
            redirect: '/dashboard',
            leaf: true,// 只有一个节点
            menuShow: true,
            iconCls: 'iconfont icon-home',
            children: [
                {path: '/dashboard', meta: {keepAlive: false, isBack: false}, component: () => import('../components/homePage/dashboard'), name: '首页'},
                {path: '/cgs', meta: {keepAlive: false, isBack: false}, component: () => import('../components/homePage/cgs'), name: 'cgs'},
                {path: '/socialsecurity', meta: {keepAlive: false, isBack: false}, component: () => import('../components/homePage/sb'), name: 'sb'},
                {path: '/step/:id', meta: {keepAlive: true, isBack: false}, name: 'step', component: () => import('../components/homePage/step')},
                {path: '/wdsq', meta: {keepAlive: false, isBack: false}, component: () => import('../components/homePage/wdsq'), name: 'wdsq'},
            ]
        },
    ]
})

router.beforeEach((to, from, next) => {
    const role = store.state.app.token
    if(!role && to.path !== '/system' && to.path !== '/login') {
        next('/')
    } else {
        next()
    }
})

export default router