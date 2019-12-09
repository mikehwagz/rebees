import BaseTransition from '@/transitions/BaseTransition'
import { isArray } from '@/util/is'

class StaggerTransition extends BaseTransition {
  in(props) {
    super.in(props)

    let { title, viewToggle, rule, items } = this.ui.to

    viewToggle &&
      this.tl.set(viewToggle, {
        y: 40,
        rotation: -1,
        autoAlpha: 0,
      })

    this.tl
      .set(isArray(items) ? items.concat(title) : [items, title], {
        y: 40,
        rotation: -1,
        autoAlpha: 0,
      })
      .set(rule, { scaleX: 0 })
      .to(
        props.to,
        {
          duration: 1.2,
          autoAlpha: 1,
          ease: 'expo',
        },
        'a',
      )
      .to(
        title,
        {
          duration: 1.2,
          y: 0,
          rotation: 0,
          autoAlpha: 1,
          ease: 'expo',
        },
        'a+=0.05',
      )

    viewToggle &&
      this.tl.to(
        viewToggle,
        {
          duration: 1.2,
          y: 0,
          rotation: 0,
          autoAlpha: 1,
          ease: 'expo',
        },
        'a+=0.1',
      )

    this.tl
      .to(
        rule,
        {
          duration: 1.2,
          scaleX: 1,
          ease: 'quint',
        },
        'a+=0.15',
      )
      .to(
        items,
        {
          duration: 1.2,
          stagger: 0.05,
          y: 0,
          rotation: 0,
          autoAlpha: 1,
          ease: 'expo',
          clearProps: 'all',
        },
        'a+=0.2',
      )
      .add(() => props.done())
  }

  out(props) {
    super.out(props)

    let { title, viewToggle, items, footer } = this.ui.from

    this.tl.to(
      title,
      {
        duration: 1.2,
        y: -40,
        autoAlpha: 0,
        ease: 'expo.inOut',
      },
      'a',
    )

    viewToggle &&
      this.tl.to(
        viewToggle,
        {
          duration: 1.2,
          y: -40,
          autoAlpha: 0,
          ease: 'expo.inOut',
        },
        'a+=0.05',
      )

    this.tl
      .to(
        items,
        {
          duration: 1.2,
          stagger: 0.05,
          y: -40,
          autoAlpha: 0,
          ease: 'expo.inOut',
        },
        'a+=0.15',
      )
      .to(
        footer,
        {
          duration: 1.2,
          autoAlpha: 0,
          ease: 'expo.inOut',
        },
        'a+=0.2',
      )
      .add(() => props.done())
  }
}

export default StaggerTransition
