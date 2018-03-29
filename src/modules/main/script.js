import Vue from 'vue'
import Vuex from 'vuex'
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import {router, links} from './router/router'
import './style.scss'

import page from './index.vue'

Vue.use(Vuex)
Vue.use(iview)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    double: state => {
      return state.count * 2
    }
  },
  mutations: {
    increment(state) {
      console.log('increment...')
      ++state.count
    }
  }
})
let data = Object.assign(page, {
  data: () => ({
    links
  }),
  computed: {
    activeName() {
      let name = '0'
      let path = location.hash.replace('#', '')
      links.forEach((item, index) => {
        if (item.path === path) {
          name = String(index)
          return true
        }
      })
      return name
    }
  }
})

let app = new Vue({
  el: '#app',
  store,
  router,
  render: h => h(data)
})
