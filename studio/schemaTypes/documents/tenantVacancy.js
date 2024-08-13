export default {
  title: 'Tenant Vacancy',
  name: 'tenantVacancy',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200
      }
    },
    {
      title: 'Description',
      name: 'description',
      type: 'richText'
    },
    {
      title: 'Typeform Link',
      name: 'typeformLink',
      type: 'typeformLink'
    },
    {
      title: 'Location',
      name: 'location',
      type: 'reference',
      to: [{type: 'location'}]
    }
  ]
}
