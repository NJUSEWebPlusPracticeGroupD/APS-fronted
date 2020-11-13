import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state={   //要设置的全局访问的state对象
  time: '2018-11-01 07:00:00',
  timesOfSecond:1
}
const getters = {   //实时监听state值的变化(最新状态)
  getTime(state) {  //承载变化的time的值
    return state.time
  },
  getTimeOfSecond(state){
    return state.timesOfSecond
  }
}
const mutations = {
  setTime(state,time){
    state.time=time
  },
  setTimeOfSecond(state,timeOfSecond){
    state.timesOfSecond=timeOfSecond
  }
}
const actions = {

}
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
export default store
