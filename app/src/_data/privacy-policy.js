const client = require('../util/client')
const groq = require('groq')
const blocksToHtml = require('@sanity/block-content-to-html')

module.exports = async function() {
  const privacyPolicy = await client.fetch(
    groq`
      *[_id == "privacyPolicypage"] {
        title,
        lastUpdated,
        content
      } [0]
    `,
  )

  // Safety check: If the document doesn't exist in Sanity yet, return a fallback
  if (!privacyPolicy) {
    console.warn(
      '⚠️ WARNING: Privacy Policy document not found in Sanity. Please publish it.',
    )
    return { title: 'Privacy Policy', content: '<p>Content coming soon.</p>' }
  }

  // Only convert to HTML if the content field actually has data
  if (privacyPolicy.content) {
    privacyPolicy.content = blocksToHtml(privacyPolicy.content)
  }
  return privacyPolicy
}
