// Returns the random number between min ~ Max, including Max.
function getRandomInt (min, max) {
  // Math.random() create [0,1) number
  // create a [x,y) number
  // Math.round(Math.random()*(y-x))+x;
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle (arr) {
  // Create a copy to prevent multiple calls.
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

// Throttling function
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
