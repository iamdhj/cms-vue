import {Mix, ShowPrice} from '*utils'
import Urls from '*urls'

import {Mutations} from '../../store/keys'

import './style.scss'
import view from './view.vue'

let page = Mix({
  props: ['title', 'paths'],
  data: () => ({
    goodList: null
  }),
  computed: {
    editLink() {
      return this.paths.GOOD_EDIT.replace(':id', '')
    }
  },
  methods: {
    ShowPrice
  },
  created() {
    // 初始化商品列表
    this.goodList = this.$store.state.goodList

    if (!this.goodList) {
      this.$fetch(Urls.GET_GOOD_LIST).then(({data}) => {
        let list = {}
        data.forEach((item) => {
          list[item.id] = item
        })
        this.goodList = list
        this.$store.commit(Mutations.INIT_GOOD_LIST, list)
      })
    }
  }
}, view)

export default page
