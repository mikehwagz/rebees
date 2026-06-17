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
      title: 'Is Leader?',
      name: 'isLeader',
      type: 'boolean',
      description: 'Mark this if this person is a Leader'
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
