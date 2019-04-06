/**
 * [jsonp query param](https://i.loli.net/2019/04/06/5ca869e167a1c.png)
 * @type {{g_tk: number, inCharset: string, outCharset: string, notice: number, format: string}}
 */
export const commonParams = {
  g_tk: 5381,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp'
}

// jsonp callback name
export const options = {
  param: 'jsonpCallback'
}

// when data success ("code": 0)
export const ERR_OK = 0
