// 利用jsonp抓取数据
import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

/**
 * fetch data (轮播图数据)
 */
export function getRecommend () {
  // static -> jsonp1.png: open in chrome, copy url(? before)
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  // Object.assign: 用于将所有可枚举的属性的值从一个或多个源对象复制到目标对象。它将返回目标对象
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}

/**
 * fetch data (歌单数据)
 * @returns {Promise.<TResult>|*}
 */
export function getDiscList () {
  // 请求后端地址, 后端地址发送http请求给qq音乐来获取数据
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

  return axios.get(url, {
    // 传递给(webpack.dev.conf.js -> app.get('/api/getDiscList', (req, res) =>)
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSongList (disstid) {
  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  // const url = 'https://c.y.qq.com/qzone/fcgi-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
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
