import { get, post } from './http'

//获取验证码
export const getYzm = data => get(`/sms/${data}`, data)
//登录
export const login = data => post('/passport/login', data)
//获取菜单
export const getMenu = data => get('/client/queryBusMenu', data)
//发起业务接口
export const createBus = data => post('/client/createBus', data)
//上传文件接口
export const uploadFile = data => post('/client/uploadFile', data)
//等待审核接口
export const createBusRemind = data => post('/client/createBusRemind', data)
//查询详情列表接口
export const queryBusMasterDetail = data => get('/client/queryBusMasterDetail', data)
//我的申请列表接口
export const queryMyBusApp = data => get('/client/queryMyBusApp', data)
//重新发起审核接口
export const reapply = data => post('/client/reapply', data)