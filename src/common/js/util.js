/* return min ~ Max, include min & max */
function getRandomInt (min, max) {
  /*
  Math.random() create (0,1) number
  create a [x,y) number
  Math.round(Math.random()*(y-x))+x;
  +1: Guaranteed to get the upper limit of this value
  */
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle (arr) {
  /* create copy prevent multiple call */
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

/* throttling func */
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
