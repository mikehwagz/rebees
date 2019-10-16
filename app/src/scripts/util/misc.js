export function poll(delay, cb, first = true) {
  first ? cb(done) : done()
  function done() {
    setTimeout(() => cb(done), delay)
  }
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function hexToRGBA(hex, alpha) {
  let c
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('')
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]]
    }
    c = '0x' + c.join('')
    return (
      'rgba(' +
      [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') +
      ', ' +
      alpha +
      ')'
    )
  } else {
    console.warn('Bad hex')
    return hex
  }
}
