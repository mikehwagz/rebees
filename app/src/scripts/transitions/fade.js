import Highway from '@dogstudio/highway'

// GSAP Library
import A from 'gsap'

// Fade
class Fade extends Highway.Transition {
  in({ from, to, done }) {
    window.scrollTo(0, 0)
    from.remove()
    A.fromTo(
      to,
      0.5,
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        onComplete: done,
      },
    )
  }

  out({ from, done }) {
    A.fromTo(
      from,
      0.5,
      { autoAlpha: 1 },
      {
        autoAlpha: 0,
        onComplete: done,
      },
    )
  }
}

export default Fade
