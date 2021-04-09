const fetch = require('node-fetch')

/**
 * Fetch get method.
 *
 * @param {string} type - String with type of fetch.
 * @returns {number} returnStatus - a variable representing a status.
 */
async function fetchGetMethod (type) {
  const status = await fetch(`http://localhost:8080/api/v1/${type}`)
  const returnStatus = status.status
  return returnStatus
}

module.exports = fetchGetMethod
