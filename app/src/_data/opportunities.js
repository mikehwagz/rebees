const client = require('../util/client')
const blocksToHtml = require('@sanity/block-content-to-html')

module.exports = async function() {
  const opportunities = await client
    .fetch(
      `*[_id == "opportunitiespage"] {
      title,
      body,
      "links": links[] {
        title,
        subtitle,
        "link": link->._type,
      }
    }`,
    )
    .then((x) => x[0])

  opportunities.body = blocksToHtml(opportunities.body)

  return opportunities
}
