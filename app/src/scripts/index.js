import app from '@/app'
import router from '@/router'

router
  .on('NAVIGATE_OUT', () => {
    let { isNavOpen } = app.getState()
    if (isNavOpen) {
      app.emit('navToggle:click', ({ isNavOpen }) => ({
        isNavOpen: !isNavOpen,
      }))
    }
  })
  .on('NAVIGATE_IN', () => {
    app.unmount()
    app.mount()
  })
  .on('NAVIGATE_END', () => {})

app.mount()
