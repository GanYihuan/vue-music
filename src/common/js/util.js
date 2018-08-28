/* return [min, Max] */
function getRandomInt(min, max) {
  /*
  [moz](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
  Math.random() return [0,1)
  return [x,y)
  Math.random()*(y-x)+x;
  */
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
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
