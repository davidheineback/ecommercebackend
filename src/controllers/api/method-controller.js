import { Category } from '../../models/categories.js'
import { SubCategory } from '../../models/subcategories.js'
import { Product } from '../../models/products.js'

/**
 * Set new id.
 *
 * @param {string} type - represent the level of the category to set new id for. main, sub or product.
 * @returns {number} id
 */
export async function setNewId (type) {
  let nextId = ''
  let prefix = ''
  switch (type) {
    case 'sub':
      nextId = await SubCategory.find({})
      nextId[0] === undefined && (nextId[0] = 1)
      prefix = 'subid'
      break
    case 'product':
      nextId = await Product.find({})
      nextId[0] === undefined && (nextId[0] = 600000)
      prefix = 'itemNr'
      break
    default:
      nextId = await Category.find({})
      nextId[0] === undefined && (nextId[0] = 1)
      prefix = 'id'
      break
  }
  if (nextId[0] === 1 || nextId[0] === 600000) {
    return nextId[0]
  } else {
    return nextId
      .map(id => id[prefix])
      .sort((a, b) => b - a)[0] + 1
  }
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
  const subids = subs.map(sub => sub.subid)
  if (!subids.includes(subcategory.subid)) {
    subs.push(subcategory)
  }
  return subs
}

/**
 * Filter product data before sending as response.
 *
 * @param {object} rawProduct - An object representing a product.
 * @returns {object} - A filtered object representing a product.
 */
export function escapeOutput (rawProduct) {
  return {
    name: rawProduct.name,
    description: rawProduct.description,
    detailedDescription: rawProduct.detailedDescription,
    price: rawProduct.price * rawProduct.discount,
    itemNr: rawProduct.itemNr,
    inStock: rawProduct.inStock > 0,
    image: rawProduct.image,
    brand: rawProduct.brand,
    options: rawProduct.options,
    reviews: rawProduct.reviews,
    rating: rawProduct.rating
  }
}

/**
 * Method to get id of a category that is to be added to a product.
 *
 * @param {string} type - A string representing the type of category to search. main or sub.
 * @param {string} mainCategoryname - name of the category to find.
 * @param {string} subCategoryname - name of the category to find.
 * @returns {number} A number representing an id.
 */
export async function findCategoryIdByName (type, mainCategoryname, subCategoryname) {
  const category = await Category.findOne({ name: mainCategoryname })
  let subid = ''
  let sub = null
  if (category) {
    switch (type) {
      case 'sub':
        subid = await SubCategory.findOne({ name: subCategoryname })
        subid && (sub = category.subs.map(subs => subs.subid).includes(subid.subid) && subid.subid)
        return sub
      case 'main':
        return category.id
      default:
        break
    }
  }
  return sub
}
