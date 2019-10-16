import { component } from '@/lib/picoapp'
import Highway from '@dogstudio/highway'
import Fade from '@/transitions/fade'
import app from '@/app'

export default component((node, ctx) => {
  const router = new Highway.Core({
    transitions: {
      default: Fade,
    },
  })

  router
    .on('NAVIGATE_OUT', () => {})
    .on('NAVIGATE_IN', () => {
      app.unmount()
      app.mount()
    })
    .on('NAVIGATE_END', () => {})
})
