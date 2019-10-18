import app from '@/app'
import router from '@/router'
import { body } from '@/util/dom'

let ctx = {
  location: window.location,
  to: { view: body.querySelector('[data-router-view]') },
  appear: true,
}

navIn(ctx)
navEnd(ctx)

router
  .on('NAVIGATE_OUT', navOut)
  .on('NAVIGATE_IN', navIn)
  .on('NAVIGATE_END', navEnd)

function navOut() {
  let { isNavOpen } = app.getState()
  if (isNavOpen) {
    app.emit('navToggle:click', ({ isNavOpen }) => ({
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

  !appear && app.unmount()
  app.mount()
}

function navEnd() {
  app.mount('data-deferred-component')
}
