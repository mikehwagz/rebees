import Highway from '@dogstudio/highway'

// Renderers
import HomeRenderer from '@/renderers/HomeRenderer'
import ProjectsGridRenderer from '@/renderers/ProjectsGridRenderer'

// Transitions
import DefaultTransition from '@/transitions/DefaultTransition'
import HomeTransition from '@/transitions/HomeTransition'
import StaggerTransition from '@/transitions/StaggerTransition'

const router = new Highway.Core({
  renderers: {
    home: HomeRenderer,
    projectsGrid: ProjectsGridRenderer,
  },
  transitions: {
    default: DefaultTransition,
    home: HomeTransition,
    projectsGrid: StaggerTransition,
    projectsList: StaggerTransition,
    people: StaggerTransition,
    opportunities: StaggerTransition,
    tenants: StaggerTransition,
    careers: StaggerTransition,
    partners: StaggerTransition,
  },
})

export default router
