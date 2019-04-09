import { commonParams } from './config'
import axios from 'axios' // ajax axios,request HTTPRequest

/**
 * get Lyric
 * @param {Number} mid
 * @return: Lyric
 */
export function getLyric(mid) {
  const url = '/api/lyric' // browser accesse address, back-end proxy address
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
    .then(res => {
      return Promise.resolve(res.data)
    })
}
