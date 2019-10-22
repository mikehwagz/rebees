const client = require('../util/client')
const groq = require('groq')
const blocksToHtml = require('@sanity/block-content-to-html')

module.exports = async function() {
  const tenants = await client.getDocument('tenantspage')

  const list = await client.fetch(
    groq`*[_type == "tenantVacancy"] | order(_updatedAt desc) {
      title,
      description,
      "location": location->title,
      "slug": slug.current
    }`,
  )

  tenants.body = blocksToHtml(tenants.body)

  tenants.list = list
  tenants.list.forEach((vacancy) => {
    vacancy.description = blocksToHtml(vacancy.description)
  })

  return tenants
}
