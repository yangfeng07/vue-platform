import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex({
    state: {
        token: ''
    }
})


export default store