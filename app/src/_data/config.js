const client = require('../util/client')
const groq = require('groq')
const blocksToHtml = require('@sanity/block-content-to-html')

module.exports = async function() {
  const config = await client
    .fetch(
      groq`
        *[_id == "global-config"] {
          navigation {
            email,
            "links": navigationLinks[] {
              "slug": link->_type,
              title
            }
          },
          footer
        }
      `,
    )
    .then((x) => x[0])

  config.footer.columns.forEach((column) => {
    column.body = blocksToHtml(column.body)
  })

  config.footer.copyright = config.footer.copyright.replace(
    '{year}',
    new Date().getFullYear(),
  )

  return config
}
