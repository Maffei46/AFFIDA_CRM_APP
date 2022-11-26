import Vue from 'vue'
import Vuex from 'vuex'

import State from './modules/state'
import Agenti from './modules/agenti'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    State,
    Agenti
  }
})
