import {Log, Error} from '*lib/utils'
import {Fetch} from '*lib/net'

let extension = {
  install(Vue, options) {
    /**
     * 添加Vue全局方法
     */
    Vue.prototype.$log = Log
    Vue.prototype.$error = Error
    Vue.prototype.$fetch = Fetch
  }
}

export default extension
