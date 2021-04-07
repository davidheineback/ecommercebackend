import { Category } from '../../models/categories.js'
import { SubCategory } from '../../models/subcategories.js'
import slugify from 'slugify'
import { setNewId, addNewSubCategoryToMain } from './method-controller.js'

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
    const id = await setNewId('sub')
    try {
      const subcategorydata = {
        name: req.body.name,
        description: req.body.description,
        id: id,
        searchurl: slugify(req.body.name, { lower: true })
      }
      await SubCategory.insert(subcategorydata)
      await Category.findOneAndUpdate({ name: req.body.mainCategory }, { subs: await addNewSubCategoryToMain(req.body.mainCategory, subcategorydata) })
    } catch (error) {
      next(error)
    }
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
