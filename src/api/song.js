import { commonParams } from './config'
/* ajax axios,request HTTPRequest */
import axios from 'axios'

/* get lyric */
export function getLyric (mid) {
  /* browser accesse address, back-end proxy address */
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
