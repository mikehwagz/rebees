export default {
  title: 'Privacy Policy',
  name: 'termsAndConditions',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      name: 'effectiveDate',
      title: 'Effective Date',
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
