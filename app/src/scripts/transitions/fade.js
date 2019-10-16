import Highway from '@dogstudio/highway'
import Animate from 'gsap'

// Fade
class Fade extends Highway.Transition {
  in({ from, to, done }) {
    window.scrollTo(0, 0)
    from.remove()
    Animate.fromTo(
      to,
      0.5,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        onComplete: done,
      },
    )
  }

  out({ from, done }) {
    Animate.to(from, 0.5, {
      autoAlpha: 0,
      onComplete: done,
    })
  }
}

export default Fade
