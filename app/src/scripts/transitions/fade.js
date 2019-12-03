import Highway from '@dogstudio/highway'
import gsap from 'gsap'
import gl from '@/webgl'

class Fade extends Highway.Transition {
  in({ from, to, done }) {
    window.scrollTo(0, 0)
    from.remove()

    let tl = gsap.timeline({ onComplete: () => done() })

    tl.to(to, {
      duration: 0.5,
      autoAlpha: 1,
    })
  }

  out({ from, done }) {
    let isFromHome = from.dataset.routerView === 'home'
    let tl = gsap.timeline({
      onComplete: () => {
        if (!isFromHome) {
          done()
        }
      },
    })

    tl.to(from, {
      duration: 0.5,
      autoAlpha: 0,
    })

    if (isFromHome) {
      gl.particles.animateToPlane().then(() => done())
    }
  }
}

export default Fade
