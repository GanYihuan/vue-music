import originJsonp from 'jsonp'

/**
 * jsonp doc
 * https://github.com/webmodules/jsonp
 * @param url
 * @param data: pass to back-end parameter
 * @param option
 * @returns {Promise}
 */
export default function jsonp (url, data, option) {
  // url开头要有'?'
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        // Promise.resolve()
        // 如果异步操作成功，则用 resolve 方法将 Promise 对象的状态，从「未完成」变为「成功」
        resolve(data)
      } else {
        // Promise.reject()
        // 如果异步操作失败，则用 reject 方法将 Promise 对象的状态，从「未完成」变为「失败」
        reject(err)
      }
    })
  })
}

/**
 * pass back-end parameter
 * @param data
 * @returns {string}
 */
export function param (data) {
  let url = ''
  for (let k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    // escape(): 函数可对字符串进行编码，这样就可以在所有的计算机上读取该字符串
    // encodeURI()函数: 函数可把字符串作为 URI 进行编码。
    // encodeURIComponent(): 函数可把字符串作为 URI 组件进行编码
    url += `&${k}=${encodeURIComponent(value)}`
  }
  // 去掉第一个 '&'
  return url ? url.substring(1) : ''
}
