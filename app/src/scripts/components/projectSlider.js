import { component } from '@/lib/picoapp'
import VirtualScroll from 'virtual-scroll'
import { add, remove, body } from '@/util/dom'
import { clamp } from '@/util/math'

export default component((node, ctx, { slides }) => {
  let isSliderInit = false
  let isAnimating = false
  let vs = null

  ctx.on('resize', resize)

  function resize({ width }) {
    if (width >= 650) {
      initSlider()
    } else {
      destroySlider()
    }
  }

  function initSlider() {
    if (isSliderInit) return

    add(body, 'oh')

    ctx.on('slider:update', ({ sliderIndex }) => {
      for (let i = 0; i < slides.length; i++) {
        let slide = slides[i]
        slide.style.pointerEvents = i === sliderIndex ? 'auto' : 'none'
        slide.style.transform = `translate3d(${
          i === sliderIndex ? 0 : i > sliderIndex ? 100 : -100
        }%, 0, 0)`
      }
    })

    vs = new VirtualScroll({
      limitInertia: true,
      passive: true,
    })

    vs.on(onSlide)

    ctx.emit('slider:update', { sliderLength: slides.length })

    requestIdleCallback(() =>
      slides.forEach((slide) => add(slide, 'is-animateable')),
    )

    isSliderInit = true

    ctx.on('slider:increment', () => onSlide({ deltaY: -1 }))
    ctx.on('slider:decrement', () => onSlide({ deltaY: 1 }))
  }

  function onSlide({ deltaY }) {
    if (isAnimating) return

    ctx.emit('slider:update', ({ sliderIndex }) => {
      let direction = deltaY < 0 ? 1 : -1
      let newSliderIndex = clamp(sliderIndex + direction, 0, slides.length - 1)

      if (sliderIndex !== newSliderIndex) {
        isAnimating = true

        setTimeout(() => {
          isAnimating = false
        }, 400)
      }

      return {
        sliderIndex: newSliderIndex,
      }
    })
  }

  function destroySlider() {
    if (!isSliderInit) return

    vs.off(onSlide)
    vs.destroy()
    vs = null

    remove(body, 'oh')
    slides.forEach((slide) => {
      remove(slide, 'is-animateable')
      slide.style.pointerEvents = null
      slide.style.transform = null
    })

    isSliderInit = false

    requestIdleCallback(() => {
      ctx.emit('resize', ctx.getState())
    })
  }

  return () => {
    destroySlider()
  }
})
