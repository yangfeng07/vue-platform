import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex({
    state: {
        token: '111'
    }
})


export default store