import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'
import store from '../store'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        // {
        //     path: '/',
        //     name: 'login',
        //     redirect: '/login'
        // },
        {
            path: '/',
            name: 'login',
            component: Login
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
    console.log(store.state.app.token)
    // const role = store.state.token
    // if(!role && to.path !== '/') {
    //     next('/')
    // } else {
        next()
    // }
})

export default router