import { Category } from '../../models/categories.js'

/**
 * Set new id.
 *
 * @memberof CategoriesController
 * @returns {number} id
 */
export async function setNewId () {
  let nextId = await Category.find({})
  if (nextId.length < 1) {
    nextId = 1
  } else {
    nextId = nextId
      .map(id => id.id)
    nextId.sort((a, b) => b - a)
    nextId = nextId[0] + 1
  }
  return nextId
}

/**
 * Find id for a Category by name.
 *
 * @param {string} categoryname - Name of the category to find Id for.
 * @returns {number} id
 */
export async function FindCategoryIdByName (categoryname) {
  return await Category.findOne({ name: categoryname }).id
}
