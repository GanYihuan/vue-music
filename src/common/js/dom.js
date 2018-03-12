export function addClass (el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function getData (e, name, val) {
  let prefix = 'data-'
  name = prefix + name
  if (val) {
    return e.setAttribute(name, val)
  } else {
    return e.getAttribute(name)
  }
}
