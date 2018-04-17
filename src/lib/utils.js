import Vue from 'vue'
import extension from '*lib/extension'

/*
 * Vue 初始化方法
 */
let Init = (config, view) => {
  let el = process.env.NODE_ENV === 'test' ? null : '#app'
  let param = Mix({
    el,
    render: h => {
      return h(view)
    }
  }, config)

  Vue.use(extension)

  return new Vue(param)
}

/*
 * 合并对象方法
 */
let Mix = (...obj) => {
  return Object.assign(...obj)
}

/*
 * 调试打印接口
 */
let Log = (...msg) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(...msg)
  }
}

/*
 * 调试错误接口
 */
let Error = (...msg) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(...msg)
  }
}

/**
 * 格式化日期方法
 * @param value:  时间戳或者日期字符串 eg:1523858328781,'2018-07-15'
 * @param fmt:  时间格式  eg:yyyy-MM-dd hh:mm:ss
 */
let FormatDate = (value, fmt) => {
  let date = value
  let type = typeof date
  if (type === 'number' || type === 'string') {
    date = new Date(date)
  }
  if (!date || !date.getTime || isNaN(date) || typeof fmt !== 'string') {
    Log(`[FormatDate]: ${value} format error`)
    return ''
  }

  let o = {
    'y+': date.getFullYear(), // 年
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds() // 秒
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, `00${o[k]}`.substr(-RegExp.$1.length))
    }
  }

  return fmt
}

/*
 * 实际显示价格
 */
let ShowPrice = (price) => {
  return parseFloat(price / 100).toFixed(2)
}

/*
 * 按‘分’为保存价格，
 */
let SavePrice = (price) => {
  return price * 100
}

export {
  Init,
  Mix,
  Log,
  Error,
  FormatDate,
  ShowPrice,
  SavePrice
}
