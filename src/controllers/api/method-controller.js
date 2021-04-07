import { Category } from '../../models/categories.js'
import { SubCategory } from '../../models/subcategories.js'

/**
 * Set new id.
 *
 * @param {string} type - represent the level of the category to set new id for. main or sub.
 * @returns {number} id
 */
export async function setNewId (type) {
  let nextId = ''
  type === 'sub'
    ? (nextId = await SubCategory.find({}))
    : (nextId = await Category.find({}))

  nextId.length < 1
    ? (nextId = 1)
    : (nextId = nextId
        .map(id => id.id)
        .sort((a, b) => b - a)[0] + 1)
  return nextId
}

/**
 * Find id for a Category by name.
 *
 * @param {string} categoryname - Name of the category to find Id for.
 * @param {object} subcategory - subcategory to add to the collection of subcategories for a maincategory.
 * @returns {Array} returns an array with subs.
 */
export async function addNewSubCategoryToMain (categoryname, subcategory) {
  const category = await Category.findOne({ name: categoryname })
  const subs = category.subs
  const subids = subs.map(sub => sub.id)
  if (!subids.includes(subcategory.id)) {
    subs.push(subcategory)
  }
  console.log(subs)
  return subs
}
