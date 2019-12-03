import Highway from '@dogstudio/highway'
import Home from '@/renderers/home'
import Fade from '@/transitions/fade'

const router = new Highway.Core({
  renderers: {
    home: Home,
  },
  transitions: {
    default: Fade,
  },
})

export default router
