import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/index'
process.env.VUE_APP_MOCK && import('./mock/index')

console.log(process.env.VUE_APP_MOCK);
//process.env.VUE_APP_MOCK && import('./mock/chart')
//import './mock'

Vue.use(store)
Vue.config.productionTip = false
Vue.use(router)

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
