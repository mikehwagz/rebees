import app from '@/app'
import router from '@/router'
import { ready, body, size, on, add, remove } from '@/util/dom'
import gsap from 'gsap'
// import { toggleVisibilityOnKey } from '@/util/misc'

ready(() => {
  // if (process.env.NODE_ENV !== 'production') {
  //   require('@/util/stats')()
  //   toggleVisibilityOnKey('#stats', 's')
  // }

  // Mimics the data passed to navigation event handlers by our router (Highway.js)
  let links = document.querySelectorAll('nav a')
  let ctx = {
    location: window.location,
    to: { view: body.querySelector('[data-router-view]') },
  }

  addGlobalEvents()

  // Fire navigation event handlers with out context object
  navIn(ctx)

  function navOut() {
    let { route, isNavOpen } = app.getState()

    app.hydrate({
      prevRoute: route,
      route: getRoute(),
    })

    // Hide nav if it's open
    if (isNavOpen) {
      app.emit('navToggle', ({ isNavOpen }) => ({
        isNavOpen: !isNavOpen,
      }))
    }
  }

  function navIn({ to, location }) {
    // Update page theme using `data-theme` attribute on body element (default `parchment`)
    if (to.view.dataset.theme) {
      body.setAttribute('data-theme', to.view.dataset.theme)
    } else {
      body.setAttribute('data-theme', 'parchment')
    }

    for (let i = 0; i < links.length; i++) {
      const link = links[i]

      // Clean class
      remove(link, 'is-active')

      // Active link
      if (link.href === location.href) {
        add(link, 'is-active')
      }
    }

    if (app.getState().isAppear) {
      app.hydrate({ route: getRoute() })
      let offReady = app.on('ready', () => {
        offReady()
        gsap.to(to.view, {
          duration: 0.5,
          autoAlpha: 1,
          onComplete: () => navEnd(ctx),
        })
      })
    } else {
      app.unmount()
      app.hydrate({ sliderIndex: 0 })
    }

    app.mount()
    resize()
  }

  function navEnd() {
    if (app.getState().isAppear) {
      app.hydrate({ isAppear: false })
    }

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

  function getRoute() {
    let path = window.location.pathname
    let staticRoutes = {
      '/': 'home',
      '/projects/': 'projectsGrid',
      '/projects/list/': 'projectsList',
      '/opportunities/': 'opportunities',
      '/people/': 'people',
      '/partners/': 'partners',
      '/careers/': 'careers',
      '/tenants/': 'tenants',
    }

    let route = staticRoutes[path]

    if (route) {
      return route
    } else if (path.indexOf('/project/') > -1) {
      return 'project'
    } else if (path.indexOf('/people/') > -1) {
      return 'person'
    } else {
      return 'error'
    }
  }
})
