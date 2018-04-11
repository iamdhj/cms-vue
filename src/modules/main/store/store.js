import Vue from 'vue'
import Vuex from 'vuex'

import {Getters, Mutations} from './keys'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    goodList: null
  },
  getters: {
    [Getters.GOOD_INFO]: (state) => (id) => {
      if (state.goodList) {
        return state.goodList[id]
      }
    }
  },
  mutations: {
    [Mutations.INIT_GOOD_LIST](state, goodList) {
      state.goodList = goodList
    },
    [Mutations.ADD_GOOD_INFO](state, goodInfo) {
      if (!state.goodList) {
        return
      }
      state.goodList[goodInfo.id] = goodInfo
    }
  },
  actions: {
    init(context) {
    }
  },
  modules: {}
})

export {
  store
}
