const fetch = require('node-fetch')
/**
 * Fetch method.
 *
 * @param {string} type - String with type of fetch.
 * @returns {number} returnStatus - a variable representing a status.
 */
async function fetchGetMethod (type) {
  try {
    const status = await fetch(`http://localhost:8080/api/v1/${type}`)
    const returnStatus = status.status
    return returnStatus
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = fetchGetMethod
