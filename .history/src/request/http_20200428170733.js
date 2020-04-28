import axios from 'axios'
import Vue from 'vue'
import QS from 'qs'
import { Toast, Dialog } from 'cube-ui'

Vue.use(Toast)
Vue.use(Dialog)

const toast = Toast.$create({
    time: 0,
    txt: 'Toast time 0'
})


//创建axios实例
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
const service = axios.create({
    baseURL: '/api',
    timeout: 3000
})


//请求拦截
service.interceptors.request.use(
    config => {
        const token = sessionStorage.get('token')
        if(token != '') {
            config.headers.token = token
        }
        return config
    },
    error => {
        return Promise.error(error);
    }
)

//响应拦截器
service.interceptors.response.use(
    toast.hide(),
    response => {
        if(response.status === 200) {
            return Promise.resolve(response)
        } else {
            Dialog.$create({
                type: 'alert',
                content: response.message,
                icon: 'cubeic-alert'
            })
            return Promise.reject(response)
        }
    },
    error => {
        Dialog.$create({
            type: 'alert',
            content: error.message,
            icon: 'cubeic-alert'
        })
        return Promise.reject(error)
    }
)

export function get(url, a) {
    return new Promise( (resolve, reject) => {
        service.get(url, {
            params: a
        })
        .then(response => {
            resolve(response.data)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export function post(url, params) { 
    return new Promise((resolve, reject) => {         
        service.post(url, QS.stringify(params))        
        .then(res => {            
            resolve(res.data);        
        })        
        .catch(err => {            
            reject(err.data)        
        })    
    });
}