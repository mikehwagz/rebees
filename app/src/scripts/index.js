import app from '@/app'
import router from '@/router'
import { ready, body, size, on } from '@/util/dom'
import gsap from 'gsap'

ready(() => {
  if (process.env.NODE_ENV !== 'production') {
    require('@/util/stats')()
  }

  // Mimics the data passed to navigation event handlers by our router (Highway.js)
  // Note the addition of the `appear` flag for initial page load
  let ctx = {
    location: window.location,
    to: { view: body.querySelector('[data-router-view]') },
    appear: true,
  }

  addGlobalEvents()

  // Fire navigation event handlers with out context object
  navIn(ctx)

  function navOut() {
    // Hide nav if it's open
    let { isNavOpen } = app.getState()
    if (isNavOpen) {
      app.emit('navToggle', ({ isNavOpen }) => ({
        isNavOpen: !isNavOpen,
      }))
    }
  }

  function navIn({ to, appear }) {
    // Update page theme using `data-theme` attribute on body element (default `parchment`)
    if (to.view.dataset.theme) {
      body.setAttribute('data-theme', to.view.dataset.theme)
    } else {
      body.setAttribute('data-theme', 'parchment')
    }

    // here's where that `appear` flag comes in handy
    if (appear) {
      gsap.to(to.view, {
        duration: 0.5,
        autoAlpha: 1,
        onComplete: () => navEnd(ctx),
      })
    } else {
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

  function move({ clientX, clientY }) {
    app.emit('mousemove', { clientX, clientY })
  }

  function update() {
    app.emit('update', ({ frameCount }) => ({
      frameCount: frameCount + 1,
    }))
  }

  function addGlobalEvents() {
    on(window, 'resize', resize)
    on(document, 'mousemove', move)
    gsap.ticker.add(update)

    router
      .on('NAVIGATE_OUT', navOut)
      .on('NAVIGATE_IN', navIn)
      .on('NAVIGATE_END', navEnd)
  }
})
