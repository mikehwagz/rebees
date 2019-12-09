import BaseTransition from '@/transitions/BaseTransition'
import gl from '@/webgl'
import SplitText from '@/lib/gsap/SplitText'

class HomeTransition extends BaseTransition {
  in(props) {
    super.in(props)

    let { title, link } = this.ui.to
    let splits = new SplitText(title, { type: 'lines' })
    let items = splits.lines.concat(link)

    this.tl
      .set(items, { y: 40, autoAlpha: 0 })
      .set(props.to, { autoAlpha: 1 })
      .to(items, {
        duration: 1.2,
        y: 0,
        autoAlpha: 1,
        stagger: 0.04,
        ease: 'expo',
      })
      .add(() => {
        splits.revert()
        props.done()
      })
  }

  out(props) {
    super.out(props)

    let { title, link, footer } = this.ui.from
    let splits = new SplitText(title, { type: 'lines' })

    this.tl
      .to(
        splits.lines.concat(link),
        {
          duration: 1.2,
          y: -40,
          autoAlpha: 0,
          stagger: 0.04,
          ease: 'expo.inOut',
        },
        'a',
      )
      .to(
        footer,
        {
          duration: 1.2,
          autoAlpha: 0,
          ease: 'expo.inOut',
        },
        'a+=0.05',
      )
      .add(() => gl.particles.animateFromCityToPlane(1.5), 'a')
      .add(() => props.done(), 'a+=1.2')
  }
}

export default HomeTransition
