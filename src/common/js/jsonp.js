import originJsonp from 'jsonp'

/**
 * jsonp package
 * https://github.com/webmodules/jsonp
 * @param url: url address, jsonp support parameter
 * @param data: pass to back-end parameter, url carry parameter, yourself define parameter
 * @param option: jsonp support parameter
 * @returns {Promise}
 */
export default function jsonp (url, data, option) {
  // url start with '?'
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        // Promise.resolve()
        // If the asynchronous operation succeeds,
        // the resolve method is used to turn the status of the Promise object from "unfinished" to "successful"
        resolve(data)
      } else {
        // Promise.reject()
        // If the asynchronous operation fails,
        // the state of the Promise object is changed from "unfinished" to "failed" with the reject method.
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
    // encodeURIComponent(): encode a string as a URI component.
    url += `&${k}=${encodeURIComponent(value)}`
  }
  // Get rid of the first '&'
  return url ? url.substring(1) : ''
}
