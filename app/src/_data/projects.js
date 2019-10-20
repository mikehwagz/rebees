const client = require('../util/client')
const blocksToHtml = require('@sanity/block-content-to-html')

module.exports = async function() {
  const projects = await client
    .fetch(
      `*[_id == "projectspage"] {
        title,
        "selected": selectedProjects[]->{
          _id,
          title,
          year,
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
          "link": link->_type
        }
      }`,
    )
    .then((x) => x[0])

  projects.selected.forEach((project) => {
    project.contentModules.forEach((module) => {
      if (module._type === 'richText') {
        module.content = blocksToHtml(module)
      }
    })
  })

  return projects
}
