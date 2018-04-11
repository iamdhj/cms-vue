import Vue from 'vue'
import VueRouter from 'vue-router'

let Order = () => import('./order/page.js')
let Goods = () => import('./goods/page.js')
let GoodEdit = () => import('./good-edit/page.js')

Vue.use(VueRouter)

const paths = {
  ORDER: '/order',
  GOODS: '/goods',
  GOOD_ADD: '/good-edit/add',
  GOOD_EDIT: '/good-edit/:id'
}

// 路由配置
const config = [
  { title: '订单列表', path: paths.ORDER, component: Order, props: true, name: 'default' },
  { title: '商品信息', path: paths.GOODS, component: Goods, props: true },
  { title: '添加商品', path: paths.GOOD_ADD, component: GoodEdit, props: true },
  { title: '编辑商品', path: paths.GOOD_EDIT, component: GoodEdit }
]

// 初始化路由对象
const routes = config.map(({path, component, name, props}) => ({path, component, name, props}))
const router = new VueRouter({
  // mode: 'history',
  routes
})

// 菜单配置
const links = config.map(({title, path, props}) => ({title, path, props}))

export {
  router as default,
  router,
  links,
  paths
}
