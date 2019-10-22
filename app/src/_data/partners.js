const client = require('../util/client')
const blocksToHtml = require('@sanity/block-content-to-html')

module.exports = async function() {
  const partners = await client.getDocument('partnerspage')

  partners.body = blocksToHtml(partners.body)

  return partners
}
