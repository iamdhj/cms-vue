import Vue from 'vue'
import extension from '*lib/extension'

/*
 * Vue 初始化方法
 */
let Init = (config, view) => {
  let param = Mix(config, {
    el: '#app',
    render: h => {
      return h(view)
    }
  })

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
  if (process.env !== 'production') {
    console.log(...msg)
  }
}

/**
 * 格式化日期方法
 */
let FormatDate = (date, fmt) => {
  if (typeof date !== 'object') {
    date = new Date(date)
  }
  if (!date || !date.getTime) {
    Log('[FormatDate]: date format error')
    return
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
  FormatDate,
  ShowPrice,
  SavePrice
}
