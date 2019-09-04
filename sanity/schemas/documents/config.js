export default {
  title: 'Configuration',
  name: 'config',
  type: 'document',
  fields: [
    {
      title: 'Navigation',
      name: 'navigation',
      type: 'object',
      fields: [
        {
          title: 'Navigation Links',
          name: 'navigationLinks',
          type: 'array',
          of: [
            {
              title: 'Navigation Link',
              name: 'navigationLink',
              type: 'object',
              fields: [
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
                {
                  title: 'Title',
                  name: 'title',
                  type: 'string',
                },
              ],
            },
          ],
        },
        {
          title: 'Email Address',
          name: 'email',
          type: 'email',
        },
      ],
    },
    {
      title: 'Footer',
      name: 'footer',
      type: 'object',
      fields: [
        {
          title: 'Columns',
          name: 'columns',
          type: 'array',
          of: [
            {
              title: 'Column',
              name: 'column',
              type: 'object',
              fields: [
                {
                  title: 'Title',
                  name: 'title',
                  type: 'string',
                },
                {
                  title: 'Body',
                  name: 'body',
                  type: 'richText',
                },
              ],
              preview: {
                select: {
                  title: 'title',
                },
              },
            },
          ],
        },
        {
          title: 'Copyright Text',
          description: 'To include current year, use {year}',
          name: 'copyright',
          type: 'string',
          preview: {
            select: {
              copyright: 'copyright',
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {},
    prepare: () => ({
      title: 'Configuration',
    }),
  },
}
