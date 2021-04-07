import { Category } from '../../models/categories.js'
import { SubCategory } from '../../models/subcategories.js'
// import { FetchController } from './fetch-controller.js'
// import fetch from 'node-fetch'
import slugify from 'slugify'
import { setNewId, findCategoryIdByName } from './method-controller.js'

/**
 * Encapsulates a controller.
 */
export class CategoriesController {
  /**
   * Add new category.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Error} - Returns a error if user validation is failed.
   */
  async addNewCategory (req, res, next) {
    const id = await setNewId()
    try {
      const categorydata = {
        name: req.body.name,
        description: req.body.description,
        id: id,
        searchurl: slugify(req.body.name, { lower: true }),
        subs: []
      }
      Category.insert(categorydata)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Add new subcategory.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Error} - Returns a error if user validation is failed.
   */
  async addNewSubCategory (req, res, next) {
    const mainCategory = findCategoryIdByName(req.body.mainCategory)
    console.log(mainCategory)
    // const subCategorydata = {}
    // SubCategory.insert(subCategorydata)
  }

  /**
   * Partial update of a category in the database.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Error} - Returns a error if user validation is failed.
   */
  async patchCategory (req, res, next) {
  }

  /**
   * Updates a category in the database.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Error} - Returns a error if user validation is failed.
   */
  async updateCategory (req, res, next) {
  }

  /**
   * Delete a category specified by id.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Error} - Returns a error if user validation is failed.
   */
  async deleteCategoryFromDb (req, res, next) {
  }
}
