import Highway from '@dogstudio/highway'
import gl from '@/webgl'
import { poll } from '@/util/misc'
import app from '@/app'

class HomeRenderer extends Highway.Renderer {
  onEnterCompleted() {
    this.removePoll = poll(8000, this.updatePoll, false)
  }

  updatePoll(done) {
    app.getState().glEnabled && gl.particles.animateToNextSeed()
    done()
  }

  onLeave() {
    this.removePoll && this.removePoll()
  }
}

export default HomeRenderer
