import { get, post } from './http'

//获取验证码
export const getYzm = data => get(`/sms/${data}`, data)
//登录
export const login = data => post(`/sms/${data}`, data)