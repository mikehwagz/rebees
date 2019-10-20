import { component } from '@/lib/picoapp'

export default component((node, ctx) => {
  ctx.on('slider:update', ({ sliderIndex, sliderLength }) => {
    let scale = (sliderIndex + 1) / sliderLength
    node.style.transform = `scaleX(${scale})`
  })

  return () => {}
})
