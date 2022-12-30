import Vue from 'vue'
import Vuex from 'vuex'

import State from './modules/state'
import Agenti from './modules/agenti'
import Banche from './modules/banche'
import Agenzie from './modules/agenzie'
import Pratiche from './modules/pratiche'
import Leads from './modules/leads'

//ENUMS
import EnumRegioni from './modules/enums/regioni'
import EnumProvince from './modules/enums/province'
import EnumComuni from './modules/enums/comuni'

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
    Agenti,
    Banche,
    Agenzie,
    Pratiche,
    Leads,
    EnumRegioni,
    EnumProvince,
    EnumComuni
  }
})
