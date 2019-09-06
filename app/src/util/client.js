const client = require('@sanity/client')

module.exports = client({
  projectId: 'uhabseje',
  dataset: 'production',
  useCdn: true,
})
