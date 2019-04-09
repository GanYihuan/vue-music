/**
 * @param {Number} min
 * @param {Number} max
 * @return: [min, max]
 */
function getRandomInt(min, max) {
  /*
  [moz](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
  Math.random() return [0,1)
  return [x,y)
  Math.random()*(y-x)+x;
  */
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * may Array out-of-order
 * @param {Array} arr
 * @return: out-of-order Array
 */
export function shuffle(arr) {
  const _arr = arr.slice() // create copy prevent multiple call
  for (let i = 0; i < _arr.length; i++) {
    const j = getRandomInt(0, i)
    const t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

/**
 * throttling function
 * @param {function} func
 * @param {Number} delay
 * @return:
 */
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
