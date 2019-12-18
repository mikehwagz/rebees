import Highway from '@dogstudio/highway'

// Renderers
import HomeRenderer from '@/renderers/HomeRenderer'
import ProjectsGridRenderer from '@/renderers/ProjectsGridRenderer'

// Transitions
import FadeTransition from '@/transitions/FadeTransition'
import HomeTransition from '@/transitions/HomeTransition'
import StaggerTransition from '@/transitions/StaggerTransition'

const router = new Highway.Core({
  renderers: {
    home: HomeRenderer,
    projectsGrid: ProjectsGridRenderer,
  },
  transitions: {
    default: StaggerTransition,
    home: HomeTransition,
    person: FadeTransition,
    project: FadeTransition,
  },
})

export default router
