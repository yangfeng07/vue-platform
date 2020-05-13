import { getMenu } from '@/request/api'
const app = {
    state: {
        menuData: []
    },
    mutations: {
        SET_MENUDATA: (state, menuData) => {
            state.menuData = menuData
            console.log(state.menuData)
        }
    },
    actions: {
        GetMenu({ commit }, pid) {
            return new Promise((resolve, reject) => {
                getMenu({ pid: pid}).then(response => {
                    console.log(response)
                    commit('SET_MENUDATA', response.data)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}

export default app