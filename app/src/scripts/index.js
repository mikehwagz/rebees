import app from '@/app'
import router from '@/router'
import { body, size, on } from '@/util/dom'
import Animate from 'gsap'

if (process.env.NODE_ENV !== 'production') {
  require('@/util/stats')()
}

let ctx = {
  location: window.location,
  to: { view: body.querySelector('[data-router-view]') },
  appear: true,
}

addGlobalEvents()
navIn(ctx)
navEnd(ctx)

function navOut() {
  let { isNavOpen } = app.getState()
  if (isNavOpen) {
    app.emit('navToggle', ({ isNavOpen }) => ({
      isNavOpen: !isNavOpen,
    }))
  }
}

function navIn({ to, appear }) {
  if (to.view.dataset.theme) {
    body.setAttribute('data-theme', to.view.dataset.theme)
  } else {
    body.setAttribute('data-theme', 'parchment')
  }

  if (!appear) {
    app.unmount()
    app.hydrate({ sliderIndex: 0 })
  }

  app.mount()
  resize()
}

function navEnd() {
  app.mount('data-deferred-component')
}

function resize() {
  app.emit('resize', size)
}

function update() {
  app.emit('update')
}

function addGlobalEvents() {
  on(window, 'resize', resize)
  Animate.ticker.addEventListener('tick', update)

  router
    .on('NAVIGATE_OUT', navOut)
    .on('NAVIGATE_IN', navIn)
    .on('NAVIGATE_END', navEnd)
}
