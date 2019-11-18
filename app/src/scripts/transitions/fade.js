import PromiseTransition from '@/lib/promiseTransition'
import gsap from 'gsap'

class Fade extends PromiseTransition {
  _in({ from, to }) {
    window.scrollTo(0, 0)
    from.remove()
    return gsap.to(to, {
      duration: 0.5,
      autoAlpha: 1,
    })
  }

  _out({ from }) {
    return gsap.to(from, {
      duration: 0.5,
      autoAlpha: 0,
    })
  }
}

export default Fade
