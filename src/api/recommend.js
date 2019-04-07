import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios' // Promise based HTTP client for the browser and node.js

/**
 * Carousel data
 * @param {type}
 * @return: jsonp
 */
export function getRecommend() {
  // ![jsonp data](https://i.loli.net/2019/04/06/5ca8638bac881.png) open in chrome, copy url(copy '?' before)
  const url =
    'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  // Object.assign: object extend attributes, (copy the values of all enumerable own properties from one or more source objects to a target object)
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}

/**
 * Popular song list recommendation data
 * @returns {Promise.<TResult>|*}
 */
export function getDiscList() {
  // request back-end address that sends HTTP request to qq music get data
  const url = '/api/getDiscList'
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })
  // **webpack.dev.conf.js** invoked back-end interface
  return axios
    .get(url, {
      params: data
    })
    .then(res => {
      return Promise.resolve(res.data)
    })
}

export function getSongList(disstid) {
  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  /* const url = 'https://c.y.qq.com/qzone/fcgi-bin/fcg_ucc_getcdinfo_byids_cp.fcg' */
  const data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    needNewCode: 0
  })
  return jsonp(url, data, options)
}
