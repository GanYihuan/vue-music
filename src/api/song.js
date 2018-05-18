import { commonParams } from './config'
// ajax axios,request HTTPRequest
import axios from 'axios'

// get the lyrics
export function getLyric (mid) {
  // The browser accesses the address, the back-end proxy address.
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
