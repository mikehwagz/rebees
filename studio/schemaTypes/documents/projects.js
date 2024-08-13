export default {
  title: 'Projects',
  name: 'projects',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Selected Projects',
      name: 'selectedProjects',
      type: 'array',
      of: [
        {
          title: 'Project',
          name: 'project',
          type: 'reference',
          to: [{type: 'project'}]
        }
      ]
    },
    {
      title: 'CTA',
      name: 'cta',
      type: 'cta'
    }
  ]
}
