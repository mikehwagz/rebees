import { picoapp } from '@/lib/picoapp'
import sniffer from '@/util/sniffer'
import { size } from '@/util/dom'

import root from '@/components/root'
import test1 from '@/components/test1'
import test2 from '@/components/test2'

const components = {
  root,
  test1,
  test2,
}

const state = {
  ...size(),
  ...sniffer(),
  // clientX: 0,
  // clientY: 0,
  // navState: 'hidden', // 'hidden' -> 'showing' -> 'shown' -> 'hiding' -> 'hidden'
}

export default picoapp(components, state)
