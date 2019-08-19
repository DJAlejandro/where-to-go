import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let defaultCity = '上海'
try {
  if (localStorage.getItem('city')) {
    defaultCity = localStorage.getItem('city')
  }
} catch (e) {}

export default new Vuex.Store({
  state: {
    city:defaultCity
  },
  mutations: {
    increment (state,data) {
      // 变更状态

      state.city=data
      try {
        localStorage.setItem('city',data)
      } catch (e) {}
    }
  },
  actions: {

  }
})
