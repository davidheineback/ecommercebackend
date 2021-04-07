// import { * } from '../../models/image.js'
// import { FetchController } from './fetch-controller.js'
// import fetch from 'node-fetch'

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
