export default {
  title: 'Privacy Policy',
  name: 'privacyPolicy',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated Date',
      type: 'string'
    },
    {
      name: 'content',
      title: 'Policy Content',
      type: 'array',
      of: [{type: 'block'}]
    }
  ]
}
