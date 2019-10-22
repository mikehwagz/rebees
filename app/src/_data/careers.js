const client = require('../util/client')
const groq = require('groq')
const blocksToHtml = require('@sanity/block-content-to-html')

module.exports = async function() {
  const careers = await client.getDocument('careerspage')

  const list = await client.fetch(
    groq`*[_type == "career"] | order(_updatedAt desc) {
      title,
      description,
      "location": location->title,
      "project": project->title,
      "slug": slug.current
    }`,
  )

  careers.body = blocksToHtml(careers.body)

  careers.list = list
  careers.list.forEach((career) => {
    career.description = blocksToHtml(career.description)
  })

  return careers
}
