let prefix

/**
 * 请求数据接口
 */
prefix = '/api'
let Urls = {
  LOGIN: `${prefix}/login`,
  GET_ORDER_LIST: `${prefix}/orderList`,
  GET_GOOD_LIST: `${prefix}/goodList`,
  ADD_GOOD_INFO: `${prefix}/addGoodInfo`,
  EDIT_GOOD_INFO: `${prefix}/editGoodInfo`
}

/**
 *  模块地址
 */
prefix = '/demo/cms-vue/pages'
let Links = {
  LOGIN: `${prefix}/login`,
  MAIN: `${prefix}/main`
}

export {
  Urls as default,
  Urls,
  Links
}
