const client = require('../util/client')
const groq = require('groq')
const blocksToHtml = require('@sanity/block-content-to-html')

module.exports = async function() {
  const people = await client.fetch(
    groq`
      *[_id == "peoplepage"] {
        title,
        leadersHeading,
        "cta": cta {
          title,
          subtitle,
          isEnabled,
          "link": link->_type
        }
      } [0]
    `,
  )

  const list = await client.fetch(
    groq`
      *[_type == "person" && isLeader != true] {
        fullName,
        bio,
        "slug": slug.current,
        "portrait": {
          "altText": portrait.altText,
          "image": portrait.image.asset->,
        }
      }
    `,
  )

  const leaders = await client.fetch(
    groq`
      *[_type == "person" && isLeader] {
        fullName,
        isLeader,
        bio,
        "slug": slug.current,
        "portrait": {
          "altText": portrait.altText,
          "image": portrait.image.asset->,
        }
      }
    `,
  )

  list.forEach((person) => {
    person.bio = blocksToHtml(person.bio)
  })

  leaders.forEach((person) => {
    person.bio = blocksToHtml(person.bio)
  })

  people.list = list
  people.leaders = leaders

  return people
}
