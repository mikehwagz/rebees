const client = require('../util/client')
const groq = require('groq')
const blocksToHtml = require('@sanity/block-content-to-html')

module.exports = async function() {
  const projects = await client.fetch(
    groq`*[_id == "projectspage"] {
        title,
        "selected": selectedProjects[]->{
          _id,
          title,
          "thumbnail": {
            "altText": thumbnail.altText,
            "image": thumbnail.image.asset->,
          },
          "category": category->title,
          "location": location->title,
          "slug": slug.current,
          contentModules[] {
            ...@,
            "image": image.asset->
          },
        },
        "cta": cta {
          title,
          subtitle,
          isEnabled,
          "link": link->_type
        }
      } [0]`,
  )

  projects.selected.forEach((project) => {
    if (project.contentModules && project.contentModules.length > 0) {
      project.contentModules.forEach((module) => {
        if (module._type === 'richText') {
          module.content = blocksToHtml(module)
        }
      })
    }
  })

  return projects
}
