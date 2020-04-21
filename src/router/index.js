import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'

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
                {path: '/dashboard', component: () => import('../components/homePage/dashboard'), name: '首页'},
                {path: '/cgs', component: () => import('../components/homePage/cgs'), name: '车购税'},
                {path: '/step', component: () => import('../components/homePage/step'), name: '步骤'},
            ]
        },
    ]
})

export default router