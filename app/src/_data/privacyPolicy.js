const client = require('../util/client')
const groq = require('groq')
const blocksToHtml = require('@sanity/block-content-to-html')

const h = blocksToHtml.h

function blockSerializer(props) {
  const style = props.node.style || 'normal'

  if (style === 'h2') {
    return h('h2', { className: 'f30 s:f46' }, props.children)
  }

  if (style === 'h3') {
    return h('h3', { className: 'f22 s:f30' }, props.children)
  }

  if (/^h\d/.test(style)) {
    return h(style, null, props.children)
  }

  return style === 'blockquote'
    ? h('blockquote', null, props.children)
    : h('p', null, props.children)
}

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
  if (privacyPolicy.content && privacyPolicy.content.length) {
    privacyPolicy.content = blocksToHtml({
      blocks: privacyPolicy.content.filter(Boolean),
      serializers: {
        types: { block: blockSerializer },
      },
    })
  }
  return privacyPolicy
}
