import { getMenu } from '@/request/api'
const app = {
    state: {
        menuData: []
    },
    mutations: {
        SET_MENUDATA: (state, menuData) => {
            state.menuData = menuData
        }
    },
    actions: {
        LoginByNumber({ commit })
    }
}

export default app