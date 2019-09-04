export default {
  title: 'CTA',
  name: 'cta',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Subtitle',
      name: 'subtitle',
      type: 'string',
    },
    {
      title: 'Link',
      name: 'link',
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
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
  },
}
