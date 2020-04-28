import { get } from './http'

//获取验证码
export const getYzm = data => get(`/sms/${data}`, data)
//登录
export const login = data => get(`/sms/${data}`, data)