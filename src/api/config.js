/**
 * config param
 * static -> jsonp2
 * @type {{g_tk: number, inCharset: string, outCharset: string, notice: number, format: string}}
 */
export const commonParams = {
  g_tk: 5381,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp'
};

// jsonp callback name
export const options = {
  param: 'jsonpCallback'
};

// when data correct (in chrome, jsonp1.png data -> "code": 0)
export const ERR_OK = 0;