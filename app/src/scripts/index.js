import Highway from '@dogstudio/highway'
import Fade from './transitions/fade'

const H = new Highway.Core({
  transitions: {
    default: Fade,
  },
})

H.on('NAVIGATE_IN', ({ to, trigger, location }) => {
  console.groupCollapsed('IN')
  console.log(to, trigger, location)
  console.groupEnd()
})

H.on('NAVIGATE_OUT', ({ from, trigger, location }) => {
  console.groupCollapsed('OUT')
  console.log(from, trigger, location)
  console.groupEnd()
})

H.on('NAVIGATE_END', ({ to, from, trigger, location }) => {
  console.groupCollapsed('END')
  console.log(to, from, trigger, location)
  console.groupEnd()
})
