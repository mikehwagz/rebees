const client = require('../util/client')

module.exports = async function() {
  const projects = await client
    .fetch(
      `*[_id == "projectspage"] {
    title,
    "selected": selectedProjects[]->{
      _id,
      title,
      year,
      "thumbnail": {
        "altText": thumbnail.altText,
        "image": thumbnail.image.asset->,
      },
      "category": category->title,
      "location": location->title,
      "slug": slug.current
    },
    "cta": cta { title, subtitle, "link": link->_type }
  }`,
    )
    .then((x) => x[0])

  return projects
}
