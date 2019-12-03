import Highway from '@dogstudio/highway'
import app from '@/app'
import gl from '@/webgl'
import { poll } from '@/util/misc'

class Home extends Highway.Renderer {
  onEnter() {
    this.offPoll = poll(
      5000,
      (done) => gl.particles.animate().then(done),
      false,
    )
  }

  onLeave() {
    this.offPoll()
  }

  onEnterCompleted() {}

  onLeaveCompleted() {}
}

export default Home
