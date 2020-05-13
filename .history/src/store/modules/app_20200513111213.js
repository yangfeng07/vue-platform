const app = {
    state: {
        menuData: []
    },
    mutations: {
        SET_MENUDATA: (state, menuData) => {
            state.menuData = menuData
        }
    }
}

export default app