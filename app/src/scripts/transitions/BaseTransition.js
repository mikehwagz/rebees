import Highway from '@dogstudio/highway'
import gsap from 'gsap'
import choozy from 'choozy'
import app from '@/app'
import gl from '@/webgl'

class BaseTransition extends Highway.Transition {
  constructor(props) {
    super(props)

    this.tl = new gsap.timeline()
    this.ui = {
      from: null,
      to: null,
    }
  }

  in({ from, to }) {
    window.scrollTo(0, 0)
    from.remove()

    this.tl.clear()
    this.ui.to = choozy(to, 'a-')
  }

  out({ from }) {
    this.tl.clear()
    this.ui.from = choozy(from, 'a-')

    if (this.route === 'home') {
      this.tl.add(() => gl.particles.animateFromPlaneToCity(1.7), 0)
    }
  }

  get route() {
    return app.getState().route
  }

  get prevRoute() {
    return app.getState().prevRoute
  }
}

export default BaseTransition
