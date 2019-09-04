export default {
  title: 'Home',
  name: 'home',
  type: 'document',
  fields: [
    {
      title: 'Headline',
      name: 'headline',
      type: 'text',
    },
    {
      title: 'Projects Link Text',
      name: 'projectsLinkText',
      type: 'string',
    },
  ],
  preview: {
    select: {},
    prepare: () => ({
      title: 'Home',
    }),
  },
}
