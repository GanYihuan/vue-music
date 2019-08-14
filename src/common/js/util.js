/*
 * @Description: 工具函数
 * @version:
 * @Author: GanEhank
 * @Date: 2019-08-04 02:31:14
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-14 11:40:25
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// 洗牌: 遍历arr， 从0-i 之间随机取一个数j，使arr[i]与arr[j]互换
export function shuffle(arr) {
  const _arr = arr.slice() // 改变副本，不修改原数组 避免副作用
  for (let i = 0; i < _arr.length; i++) {
    const j = getRandomInt(0, i)
    const t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

// 截流
// 对一个函数做截流，就会返回新的函数，新函数是在延迟执行原函数
// 如果很快的多次调用新函数，timer会被清空，不能多次调用原函数，实现截流
export function debounce(func, delay) {
  let timer
  return function(...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
