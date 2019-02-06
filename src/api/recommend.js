import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
/* ajax */
import axios from 'axios'

/**
 * use jsonp fetch data (轮播图数据)
 * @return: jsonp
 */
export function getRecommend() {
  /* static/jsonp1.png: open in chrome, copy url(copy '?' before) */
  const url =
    'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  /* Object.assign: object extend attributes */
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}

/**
 * fetch data (热门歌单推荐数据)
 * @returns {Promise.<TResult>|*}
 */
export function getDiscList() {
  /* request back-end address that sends HTTP request to qq music get data. */
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
  return axios
    .get(url, {
      /* api/recommend.js/getDiscList invoked back-end interface */
      /* webpack.dev.conf.js app.get('/api/getDiscList', (req, res) => {}) */
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
