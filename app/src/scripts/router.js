import Highway from '@dogstudio/highway'
import Fade from '@/transitions/fade'

const router = new Highway.Core({
  transitions: {
    default: Fade,
  },
})

export default router
