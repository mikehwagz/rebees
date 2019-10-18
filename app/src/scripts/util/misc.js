import cubicBezier from 'bezier-easing'
import { map as mapRange, round } from '@/util/math'

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

export function easedGradient({ direction, rgb, steps, bezier }) {
  let ease = cubicBezier(...bezier)
  let vals = Array(steps)
    .fill()
    .map((_, i) => {
      const percent = round(mapRange(i, 0, steps - 1, 0, 1))
      const alpha = 1 - ease(percent)
      return { percent: percent * 100, alpha }
    })

  const getColorStop = ({ rgb, alpha, percent }) =>
    `rgba(${rgb.join(', ')}, ${alpha}) ${percent}%`

  return `linear-gradient(
    ${direction},
    ${vals
      .map(({ alpha, percent }) => getColorStop({ rgb, alpha, percent }))
      .join(',\n')}
  )`
}
