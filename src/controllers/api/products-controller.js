import { Product } from '../../models/products.js'
import { setNewId, findCategoryIdByName } from './method-controller.js'
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
    try {
      const productCategory = await findCategoryIdByName('main', req.body.productCategory)

      let productSubCategory = ''
      if (req.body.productSubCategory.length > 0) {
        productSubCategory = await findCategoryIdByName('sub', req.body.productCategory, req.body.productSubCategory)
      }

      if (productCategory && (productSubCategory || productSubCategory === '')) {
        const itemNr = await setNewId('product')
        const exists = await Product.findOne({ name: req.body.name })
        const productdata = {
          name: req.body.name,
          description: req.body.description,
          detailedDescription: req.body.detailedDescription,
          price: req.body.price,
          discount: 1,
          productCategory: productCategory,
          productSubCategory: productSubCategory && productSubCategory,
          inStock: req.body.inStock,
          image: req.body.image,
          brand: req.body.brand,
          itemNr: exists ? exists.itemNr : itemNr,
          options: req.body.options,
          reviews: [],
          rating: 0
        }
        if (!exists) {
          await Product.insert(productdata)
          return res.status(200).send(productdata)
        }
        return res.status(409).send('Product already exists')
      }
      return res.status(404).send('Category or Subcategory not found')
    } catch (error) {
      next(error)
    }
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
