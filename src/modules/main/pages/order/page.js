import {Mix, FormatDate} from '*utils'
import Urls from '*urls'

import './style.scss'
import view from './view.vue'

let page = Mix({
  props: ['title'],
  data() {
    return {
      labels: [
        {title: '订单编号', key: 'orderNo', sortable: 'custom'},
        {title: '顾客', key: 'customName'},
        {title: '商品', key: 'goodName'},
        {title: '日期', key: 'date', sortable: 'custom'}
      ],
      orderList: [],
      page: 1,
      pageSize: 10,
      loading: true
    }
  },
  computed: {
    // 订单总数
    orderTotal() {
      return this.orderList.length
    },
    // 订单分页数据
    orderListPage() {
      let start = (this.page - 1) * this.pageSize
      let end = this.page * this.pageSize

      return this.orderList.slice(start, end)
    }
  },
  methods: {
    // 分页切换
    pageChange(page) {
      this.page = page
    },
    // 表格排序
    sortChange({key, order}) {
      this.orderList.sort((a, b) => {
        let result = 0
        if (a[key] < b[key]) {
          result = -1
        } else if (a[key] > b[key]) {
          result = 1
        }
        return order === 'asc' ? result : result * -1
      })
      this.$log(this.orderList)
    }
  },
  created() {
    // 初始化数据
    this.loading = true
    this.$fetch(Urls.GET_ORDER_LIST).then((data) => {
      let list = data.map((item) => ({
        orderNo: item.oid,
        customName: (item.custom && item.custom.name) || '--',
        goodName: (item.good && item.good.name) || '--',
        date: FormatDate(item.date, 'yyyy-MM-dd')
      }))
      this.orderList = list
      this.loading = false
    })
  }
}, view)

export default page
