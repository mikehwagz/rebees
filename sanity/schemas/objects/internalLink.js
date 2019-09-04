export default {
  title: 'Internal Link',
  name: 'internalLink',
  type: 'object',
  fields: [
    {
      title: 'Page',
      name: 'page',
      type: 'reference',
      to: [
        { type: 'home' },
        { type: 'projects' },
        { type: 'project' },
        { type: 'person' },
        { type: 'people' },
        { type: 'opportunities' },
      ],
    },
  ],
}
