/**
 * 配置参数
 * Network -> fcg -> js -> Query String Parameters
 * @type {{g_tk: number, inCharset: string, outCharset: string, notice: number, format: string}}
 */

export const commonParams = {
  g_tk: 5381,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp'
};

export const options = {
  param: 'jsonpCallback'
};

export const ERR_OK = 0;