import {commonParams} from './config'
// ajax库axios,发起HTTPRequest
import axios from 'axios'

export function getLyric (mid) {
  // 浏览器访问地址, 后端代理地址
  const url = '/api/lyric'
  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  })

  return axios
    .get(url, {
      params: data
    })
    .then((res) => {
      return Promise.resolve(res.data)
    })
}