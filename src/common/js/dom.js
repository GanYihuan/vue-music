/**
 * container define className?
 * @param el
 * @param className
 * @returns {boolean}
 */
export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

/**
 * add className
 * @param el
 * @param className
 */
export function addClass (el, className) {
  if (hasClass(el, className)) {
    return
  }
  // The split() method is used to split a string into an array of strings
  let newClass = el.className.split(' ')
  // The push() method adds one or more elements to the end of the array and returns a new length.
  newClass.push(className)
  // The join() method is used to put all the elements in an array into a string.
  // The element is separated by the specified delimiter.
  el.className = newClass.join(' ')
}

export function getData (el, name, val) {
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}

// Configuration of different browser CSS.
let elementStyle = document.createElement('div').style
let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
  return false
})()

export function prefixStyle (style) {
  if (vendor === false) {
    return false
  }
  if (vendor === 'standard') {
    return style
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
