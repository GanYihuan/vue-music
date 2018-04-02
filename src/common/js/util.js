// 返回 min ~ max 间的随机数, 包括 min, max
function getRandomInt (min, max) {
  // Math.random()函数返回0和1之间的伪随机数，可能为0，但总是小于1，[0,1)
  // Math.random()生成[0,1)的数，所以
  // Math.random()*5生成{0,5)的数。
  // 通常期望得到整数，所以要对得到的结果处理一下。
  // parseInt()，Math.floor()，Math.ceil()和Math.round()都可得到整数。
  // parseInt()和Math.floor()结果都是向下取整。
  // 所以Math.random()*5生成的都是[0,4] 的随机整数
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// 洗牌函数
export function shuffle (arr) {
  // 创建副本,防止多次调用产生影响
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    // 互相交换
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

// 节流函数
export function debounce (func, delay) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
