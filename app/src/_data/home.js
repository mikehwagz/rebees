const client = require('../util/client')

module.exports = async function() {
  return await client.getDocument('homepage')
}
