import { getMenu } from '@/request/api'
const app = {
    state: {
        userId: '',
        token: '',
        menuBigData: [],
        menuData: [],
        cnjr: '',
        subTypeList: [],
        bzText: '',
        masterId: '',
        stepId: 0
    },
    mutations: {
        SET_USERID: (state, userId) => {
            state.userId = userId
        },
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_MENUBIGDATA: (state, menuBigData) => {
            state.menuBigData = menuBigData
        },
        SET_MENUDATA: (state, menuData) => {
            state.menuData = menuData
        },
        SET_CNJR: (state, cnjr) => {
            state.cnjr = cnjr
        },
        SET_SUBLIST: (state, subTypeList) => {
            state.subTypeList = subTypeList
        },
        SET_BZTEXT: (state, bzText) => {
            state.bzText = bzText
        },
        SET_MASTERID: (state, masterId) => {
            state.masterId = masterId
        },
        SET_STEPID: (state, stepId) => {
            if(stepId > state.stepId) {
                state.stepId = stepId
            }
        },
    },
    actions: {
        GetUserId({ commit}, userId) {
            commit('SET_USERID', userId)
        },
        GetToken({ commit}, token) {
            sessionStorage.setItem("token", token)
            commit('SET_TOKEN', token)
        },
        GetMenu({ commit }, pid) {
            return new Promise((resolve, reject) => {
                getMenu({ pid: pid}).then(response => {
                    if(pid==='') {
                        commit('SET_MENUBIGDATA', response.data)
                    } else {
                        commit('SET_MENUDATA', response.data)
                    }
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        GetCnjr({ commit}, cnjr) {
            commit('SET_CNJR', cnjr)
        },
        GetSubList({ commit}, subTypeList) {
            commit('SET_SUBLIST', subTypeList)
        },
        GetBzText({ commit}, bzText) {
            commit('SET_BZTEXT', bzText)
        },
        GetMasterId({ commit}, masterId) {
            commit('SET_MASTERID', masterId)
        },
        GetStepId({ commit}, stepId) {
            commit('SET_STEPID', stepId)
        }
    }
}

export default app