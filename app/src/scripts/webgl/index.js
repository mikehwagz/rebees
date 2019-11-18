import GL from '@/webgl/gl'
import renderer from '@/webgl/renderer'
import scene from '@/webgl/scene'
import camera from '@/webgl/camera'

export default new GL(renderer, scene, camera)
