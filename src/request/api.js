import { get } from './http'

export const getYzm = data => get(`/sms/${data}`, data)