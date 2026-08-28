const client = require('../util/client')
const groq = require('groq')
const blocksToHtml = require('@sanity/block-content-to-html')

module.exports = async function() {
  const privacyPolicy = await client.fetch(
    groq`
      *[_id == "privacyPolicypage"] {
        title,
        body,
        "links": links[] {
          title,
          subtitle,
          "link": link->._type,
        }
      } [0]
    `,
  )

  privacyPolicy.body = blocksToHtml(privacyPolicy.body)

  return privacyPolicy
}
