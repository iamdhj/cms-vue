import Vue from 'vue'
import Fetch from '*lib/net'
import {Init, Mix, Log, Error, FormatDate} from '*/lib/utils'

beforeAll(() => {
  process.env.NODE_ENV = 'production'
})

afterAll(() => {
  // process.env.NODE_ENV = ''
})

describe('Init Vue', () => {
  let app = Init({}, {
    render: () => {}
  })

  it('create Vue instance', () => {
    expect(app instanceof Vue).toBe(true)
  })

  it('Vue instance has $log, $error, $fetch', () => {
    expect(app.$log).toBe(Log)
    expect(app.$error).toBe(Error)
    expect(app.$fetch).toBe(Fetch)
  })
})

describe('Mix funtion', () => {
  it('merge tow object', () => {
    let obj = {a: 1, b: 2}
    let objA = {a: 1}
    let objB = {b: 2}
    expect(Mix(objA, objB)).toEqual(obj)
  })
})

describe('FormatDate', () => {
  let str = '2018-07-15 12:12:12'

  it('format date by string', () => {
    expect(FormatDate(str, 'yyyy-MM-dd hh:mm:ss')).toEqual(str)

    let str2 = '2018-7-5 2:2:2'
    expect(FormatDate(str2, 'yyyy-M-d h:m:s')).toEqual(str2)
  })

  it('format date by timestamp', () => {
    let date = new Date(str)
    let timestamp = date.getTime()
    expect(FormatDate(timestamp, 'yyyy-MM-dd hh:mm:ss')).toEqual(str)
  })

  it('format date by date object', () => {
    let date = new Date(str)
    expect(FormatDate(date, 'yyyy-MM-dd hh:mm:ss')).toEqual(str)
  })

  it('format date exception', () => {
    expect(FormatDate()).toEqual('')
    expect(FormatDate({}, 'yyyy-mm-dd')).toEqual('')
    expect(FormatDate(null, 'yyyy-mm-dd')).toEqual('')
    expect(FormatDate(NaN, 'yyyy-mm-dd')).toEqual('')
  })
})
