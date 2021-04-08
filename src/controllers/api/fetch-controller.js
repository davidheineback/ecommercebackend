import { Product } from '../../models/products.js'
import { SubCategory } from '../../models/subcategories.js'
import { Category } from '../../models/categories.js'
import { escapeOutput } from './method-controller.js'

/**
 * Encapsulates a controller.
 */
export class FetchController {
  /**
   * Get products by main or subcategory id.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Error} - Returns a error if user validation is failed.
   */
  async getProductsByCategoryId (req, res, next) {
    try {
      let rawProducts
      if (req.mainId) {
        rawProducts = await Product.find({ productCategory: req.mainId })
      } else {
        rawProducts = await Product.find({ productSubCategory: req.subId })
      }
      if (rawProducts) {
        const products = rawProducts.map(rawProduct => escapeOutput(rawProduct))
        return res.status(200).send(products)
      }
      return res.sendStatus(201)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Get Id for a main category.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Error} - Returns a error if user validation is failed.
   */
  async getIdFromMainName (req, res, next) {
    try {
      const maincategory = await Category.findOne({ searchurl: req.params.id })
      console.log(maincategory)
      if (!maincategory) {
        res.sendStatus(404)
      }
      req.mainId = maincategory.id
      next()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Get Id for a sub category.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Error} - Returns a error if user validation is failed.
   */
  async getIdFromSubName (req, res, next) {
    try {
      const subcategory = await SubCategory.findOne({ searchurl: req.params.id })
      if (!subcategory) {
        res.sendStatus(404)
      }
      req.subId = subcategory.subid
      next()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Get a product specified by id.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Error} - Returns a error if user validation is failed.
   */
  async getProdctWithId (req, res, next) {
    try {
      const rawProduct = await Product.findOne({ itemNr: req.params.id })
      if (rawProduct) {
        const product = escapeOutput(rawProduct)
        return res.status(200).send(product)
      }
      return res.status(404).send(`Couldn't find any products with id: ${req.params.id}`)
    } catch (error) {
      next(error)
    }
  }
}
