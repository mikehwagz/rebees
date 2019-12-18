import { component } from 'picoapp'
import app from '@/app'

export default component((node, ctx) => {
  if (!ctx.getState().isDevice) {
    getWebGL().then((GL) => {
      app.gl = new GL(node)
      app.gl.resize(ctx.getState())

      ctx.on('mousemove', ({ clientX, clientY }) => {
        app.gl.particles.handlePointerMove({ clientX, clientY })
      })

      ctx.on('resize', app.gl.resize)
      ctx.on('update', app.gl.update)

      ctx.emit('ready')
    })
  } else {
    ctx.emit('ready')
  }
})

function getWebGL() {
  return import(/* webpackChunkName: 'webgl' */ '@/webgl')
    .then(({ default: GL }) => GL)
    .catch((error) => 'An error occurred while loading the component')
}
