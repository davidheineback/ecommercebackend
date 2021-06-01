import { Product } from '../../models/products.js'
import * as globalMethod from './method-controller.js'

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
      const productCategory = await globalMethod.findCategoryIdByName('main', req.body.productCategory)
      let productSubCategory = ''
      if (req.body.productSubCategory.length > 0) {
        productSubCategory = await globalMethod.findCategoryIdByName('sub', req.body.productCategory, req.body.productSubCategory)
      }

      if (productCategory && (productSubCategory || productSubCategory === '')) {
        const itemNr = await globalMethod.setNewId('product')
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
    try {
      const item = req.body.product.itemNr
      const attribute = req.body.changeAttribute
      const newValue = req.body.newValue
      await Product.findOneAndUpdate({ itemNr: item }, { [attribute]: newValue })
      const product = await Product.findOne({ itemNr: item })
      const response = globalMethod.escapeOutput(product)
      res.status(200).json({ response, access_token: res.token })
    } catch (error) {
      res.sendStatus(403)
    }
  }

  /**
   * Delete a product specified by id.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @returns {Error} - Returns a error if user validation is failed.
   */
  async deleteProductFromDb (req, res) {
    try {
      const item = req.body.product.itemNr
      await Product.findOneAndDelete({ itemNr: item })
      res.sendStatus(204)
    } catch (error) {
      res.sendStatus(400)
    }
  }
}
