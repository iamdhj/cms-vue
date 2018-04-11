import {Log} from '*utils'
import {Fetch} from '*net'

let extension = {
  install(Vue, options) {
    /**
     * 添加Vue全局方法
     */
    Vue.prototype.$log = Log
    Vue.prototype.$fetch = Fetch
  }
}

export default extension
