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
      const exists = await Category.findOne({ name: req.body.name })
      if (!exists) {
        const categorydata = {
          name: req.body.name,
          description: req.body.description,
          id: id,
          searchurl: slugify(req.body.name, { lower: true }),
          subs: []
        }
        await Category.insert(categorydata)
        return res.status(200).send(categorydata)
      }
      return res.status(409).send('Category already exist')
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
    try {
      const id = await setNewId('sub')
      const exists = await SubCategory.findOne({ name: req.body.name })
      const subcategorydata = {
        name: req.body.name,
        description: req.body.description,
        subid: exists ? exists.subid : id,
        searchurl: slugify(req.body.name, { lower: true })
      }
      if (!exists) { await SubCategory.insert(subcategorydata) }
      const subArray = await addNewSubCategoryToMain(req.body.mainCategory, subcategorydata)
      if (subArray) {
        await Category.findOneAndUpdate({ name: req.body.mainCategory }, { subs: subArray })
      } else {
        return res.sendStatus(400)
      }
      return res.status(200).send(subcategorydata)
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
