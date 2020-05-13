import Vue from 'vue'
import './cube-ui'
import router from './router'
import './cube-ui'
import App from './App.vue'
import store from './store'
import 'amfe-flexible'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
