import React from 'react'
import Emoji from 'react-emoji-render'

export default {
  title: 'Project',
  icon: () => <Emoji style={{ fontSize: 30 }} text="🖼️" />,
  name: 'project',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200,
      },
    },
    {
      title: 'Category',
      name: 'category',
      type: 'reference',
      to: [{ type: 'category' }],
    },
    {
      title: 'Location',
      name: 'location',
      type: 'reference',
      to: [{ type: 'location' }],
    },
    {
      title: 'Thumbnail Image',
      name: 'thumbnail',
      type: 'imageWithAltText',
    },
    {
      title: 'Case Study Content Modules',
      name: 'contentModules',
      description: 'Add modules to compose a case study for the project',
      type: 'array',
      of: [{ type: 'richText' }, { type: 'imageWithAltTextAndCaption' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      thumbnail: 'thumbnail',
    },
    prepare: ({ title, thumbnail }) => ({
      title,
      media: thumbnail && thumbnail.image,
    }),
  },
}
