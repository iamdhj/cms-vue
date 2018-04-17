import Fetch from '*lib/net'

const url = require('url')
const http = require('http')
const fetch = require('node-fetch')

const proxy = http.createServer((req, res) => {
  let method = req.method
  let param = url.parse(req.url, true).query
  let result = {
    method: method,
    param: param
  }

  if (method === 'GET') {
    res.writeHead(200)
    res.end(JSON.stringify(result))
  } else if (method === 'POST') {
    param = ''
    req.addListener('data', chunk => {
      param += chunk
    }).addListener('end', () => {
      result.param = JSON.parse(param)
      res.writeHead(200)
      res.end(JSON.stringify(result))
    })
  }
})

beforeAll(() => {
  proxy.listen(9999)
  global.fetch = fetch
})

afterAll(() => {
  proxy.close()
})

describe('net', () => {
  it('http get method', () => {
    return Fetch('http://localhost:9999?name=hong&age=18').then(res => {
      expect(res).toEqual({method: 'GET', param: {name: 'hong', age: '18'}})
    }).catch(error => {
      console.log(error)
    })
  })

  it('fetch post method', () => {
    return Fetch('http://localhost:9999', {name: 'hong', age: 18}).then(res => {
      expect(res).toEqual({method: 'POST', param: {name: 'hong', age: 18}})
    }).catch(error => {
      console.log(error)
    })
  })

  it('fetch not found url', () => {
    let self = {
      $Message: {
        error(msg) {
          expect(msg).toEqual('[404] Not Found')
        }
      },
      Fetch
    }
    return self.Fetch('http://localhost:9000/abc')
  })

  it('fetch no server', () => {
    let self = {
      $error(msg) {
        expect(msg).toEqual(expect.stringContaining('failed'))
      },
      Fetch
    }
    return self.Fetch('http://xyz.abc')
  })
})
