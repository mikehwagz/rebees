export default {
  title: 'Person',
  name: 'person',
  type: 'document',
  fields: [
    {
      title: 'Full Name',
      name: 'fullName',
      type: 'string'
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'fullName',
        maxLength: 200
      }
    },
    {
      title: 'Bio',
      name: 'bio',
      type: 'richText'
    },
    {
      title: 'Portrait',
      name: 'portrait',
      type: 'imageWithAltText'
    }
  ],
  preview: {
    select: {
      title: 'fullName',
      media: 'portrait.image'
    }
  }
}
