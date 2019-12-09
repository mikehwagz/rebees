import BaseTransition from '@/transitions/BaseTransition'

class DefaultTransition extends BaseTransition {
  in(props) {
    super.in(props)

    this.tl
      .to(props.to, {
        duration: 1,
        autoAlpha: 1,
        ease: 'expo',
      })
      .add(() => props.done())
  }

  out(props) {
    super.out(props)

    this.tl
      .to(props.from, {
        duration: 1,
        autoAlpha: 0,
        ease: 'expo.inOut',
      })
      .add(() => props.done())
  }
}

export default DefaultTransition
