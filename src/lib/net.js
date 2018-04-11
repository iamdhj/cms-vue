/**
 * 统一请求方法
 */
let Fetch = function (url, body, header) {
  if (body) {
    header = Object.assign({
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    }, header)
  }

  // 模拟后台模式
  if (process.env.NODE_ENV === 'production') {
    let mocker = require('../../test/mocker')
    let method = body ? 'POST' : 'GET'
    let callback = mocker[`${method} ${url}`]
    let callbackType = typeof callback
    let promise = new Promise((resolve, reject) => {
      if (callbackType === 'object') {
        resolve(callback)
      } else if (callbackType === 'function') {
        let req = { body }
        resolve(callback(req, { json: json => json }))
      } else {
        resolve({})
      }
    })
    return promise
  }

  return fetch(url, header).then(res => {
    if (res.status === 200) {
      return res.json()
    } else {
      this.$Message.error(`[${res.status}] ${res.statusText}`)
    }
  })
}

export {
  Fetch,
  Fetch as default
}
