import axios from 'axios'
import Vue from 'vue'
import QS from 'qs'
import { Toast, Dialog } from 'cube-ui'

Vue.use(Toast)
Vue.use(Dialog)

const toast = Toast.$create({
    time: 0,
    txt: '请求中'
})


//创建axios实例
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
const service = axios.create({
    baseURL: '/api',
    timeout: 10000
})


//请求拦截
service.interceptors.request.use(
    config => {
        toast.show()
        const token = sessionStorage['token']
        if(token) {
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
    response => {
        toast.hide()
        console.log(response)
        if(response.status && response.status === 200) {
            return Promise.resolve(response)
        } else {
            Dialog.$create({
                type: 'alert',
                content: response.message,
                icon: 'cubeic-alert'
            }).show()
            return Promise.reject(response)
        }
    },
    error => {
        toast.hide()
        if(error.code == 'ECONNABORTED' && error.message.indexOf('timeout')!=-1) {
            Dialog.$create({
                type: 'alert',
                content: '请求超时，请稍后再试！',
                icon: 'cubeic-alert'
            }).show()
        } else {
            Dialog.$create({
                type: 'alert',
                content: '请求出错，请稍后再试！',
                icon: 'cubeic-alert'
            }).show()
        }
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