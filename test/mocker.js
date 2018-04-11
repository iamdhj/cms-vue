const prefix = '/api'

const random = (range) => {
  return Math.random() * range | 0
}
const randomName = () => {
  let randomFont = () => {
    let start = Number.parseInt(escape('好').replace('%u', '0x'))
    let code = Number.parseInt(start + random(1000)).toString(16)
    return unescape('%u' + code)
  }
  return randomFont() + randomFont()
}

const goodList = [
  {id: 0, name: '七喜', price: 300, img: 'img', desc: 'desc'},
  {id: 1, name: '可乐', price: 300, img: 'img', desc: 'desc'},
  {id: 2, name: '雪碧', price: 300, img: 'img', desc: 'desc'}
]

const proxy = {
  [`GET ${prefix}/login`]: {},
  [`GET ${prefix}/orderList`]: (req, res) => {
    let orderList = []
    for (let i = 0; i < 20; ++i) {
      orderList.push({
        oid: i,
        custom: {id: i, name: randomName()},
        good: goodList[random(4)],
        date: new Date().getTime() - random(10 * 24 * 3600 * 1000)
      })
    }
    return res.json(orderList)
  },
  [`GET ${prefix}/goodList`]: { data: goodList },
  [`POST ${prefix}/addGoodInfo`]: (req, res) => {
    let id = goodList.length
    let goodInfo = req.body

    goodInfo.id = id
    goodList.push(goodInfo)

    return res.json({id})
  },
  [`POST ${prefix}/editGoodInfo`]: (req, res) => {
    let goodInfo = req.body

    goodList.forEach((item, index) => {
      if (item.id === goodInfo.id) {
        goodList[index] = goodInfo
      }
    })

    return res.json({id: goodInfo.id})
  }
}

module.exports = proxy
