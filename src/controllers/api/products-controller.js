// import { * } from '../../models/image.js'
// import { FetchController } from './fetch-controller.js'
// import fetch from 'node-fetch'

/**
 * Encapsulates a controller.
 */
export class ProductsController {
  /**
   * Add new product.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Error} - Returns a error if user validation is failed.
   */
  async addNewProduct (req, res, next) {
  }

  /**
   * Partial update of a product in the database.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Error} - Returns a error if user validation is failed.
   */
  async patchProduct (req, res, next) {
  }

  /**
   * Updates a product in the database.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Error} - Returns a error if user validation is failed.
   */
  async updateProduct (req, res, next) {
  }

  /**
   * Delete a product specified by id.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Error} - Returns a error if user validation is failed.
   */
  async deleteProductFromDb (req, res, next) {
  }
}
