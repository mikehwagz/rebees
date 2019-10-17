import { component } from '@/lib/picoapp'
import cubicBezier from 'bezier-easing'
import { map as mapRange, round } from '@/util/math'

export default component((node) => {
  node.style.backgroundImage = easedGradient({
    direction: '180deg',
    rgb: [255, 252, 245],
    steps: 20,
    bezier: [0.81, 0.01, 0.35, 0.68],
  })
})

function easedGradient({ direction, rgb, steps, bezier }) {
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
