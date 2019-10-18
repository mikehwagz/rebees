const client = require('../util/client')
const blocksToHtml = require('@sanity/block-content-to-html')

module.exports = async function() {
  const people = await client
    .fetch(
      `*[_id == "peoplepage"] {
        title,
        "cta": cta { title, subtitle, "link": link->_type }
      }`,
    )
    .then((x) => x[0])

  const list = await client.fetch(`*[_type == "person"] {
    fullName,
    bio,
    "slug": slug.current,
    "portrait": {
      "altText": portrait.altText,
      "image": portrait.image.asset->,
    }
  }`)

  list.forEach((person) => {
    person.bio = blocksToHtml(person.bio)
  })

  people.list = list

  return people
}
