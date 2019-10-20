import { picoapp } from '@/lib/picoapp'
import sniffer from '@/util/sniffer'
import { size } from '@/util/dom'

import navToggle from '@/components/navToggle'
import navToggleBurger from '@/components/navToggleBurger'
import navToggleX from '@/components/navToggleX'
import navOverlay from '@/components/navOverlay'
import lazyImage from '@/components/lazyImage'
import scrim from '@/components/scrim'
import peopleList from '@/components/peopleList'
import projectProgressMobile from '@/components/projectProgressMobile'
import projectProgress from '@/components/projectProgress'
import projectSlider from '@/components/projectSlider'

const components = {
  navToggle,
  navToggleBurger,
  navToggleX,
  navOverlay,
  lazyImage,
  scrim,
  peopleList,
  projectProgressMobile,
  projectProgress,
  projectSlider,
}

const state = {
  ...size(),
  ...sniffer(),
  isNavOpen: false,
  sliderIndex: 0,
  sliderLength: null,
}

export default picoapp(components, state)
