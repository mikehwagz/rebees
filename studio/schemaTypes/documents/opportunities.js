export default {
  title: 'Opportunities',
  name: 'opportunities',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Body',
      name: 'body',
      type: 'richText'
    },
    {
      title: 'Links',
      name: 'links',
      type: 'array',
      of: [{type: 'cta'}]
    }
  ]
}
