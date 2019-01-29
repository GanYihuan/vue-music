import originJsonp from 'jsonp'

/**
 * https://github.com/webmodules/jsonp
 * @param url: url address
 * @param data: pass to back-end parameter
 * @param option: jsonp support parameter
 * @returns {Promise}
 */
export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

export function param(data) {
  let url = ''
  for (const k in data) {
    const value = data[k] !== undefined ? data[k] : ''
    // encodeURIComponent(): encode string as URI component
    url += `&${k}=${encodeURIComponent(value)}`
  }
  // get rid of first '&'
  return url ? url.substring(1) : ''
}
