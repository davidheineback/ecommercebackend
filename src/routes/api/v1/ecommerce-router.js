import express from 'express'
import { ProductsController } from '../../../controllers/api/products-controller.js'
import { CategoriesController } from '../../../controllers/api/categories-controller.js'
import { FetchController } from '../../../controllers/api/fetch-controller.js'
import { TokenController } from '../../../controllers/api/token-controller.js'

// add router::
export const router = express.Router()

const fetchController = new FetchController()
const tokenController = new TokenController()
const productsController = new ProductsController()
const categoriesController = new CategoriesController()

// Get routes::
router.route('/category/').get(fetchController.getCategories)
router.route('/products/').get(fetchController.getProducts)
router.route('/category/:id').get(fetchController.getIdFromMainName, fetchController.getProductsByCategoryId)
router.route('/subcategory/:id').get(fetchController.getIdFromSubName, fetchController.getProductsByCategoryId)
router.route('/product/:id').get(fetchController.getProdctWithId)
router.route('/admin/auth').get(tokenController.authenticateToken)

// Post routes::
router.route('/admin/login').post(tokenController.login)
// router.route('/admin/register').post(tokenController.register)
router.route('/admin/addcategory').post(tokenController.authenticateToken, categoriesController.addNewCategory)
router.route('/admin/addsubcategory').post(tokenController.authenticateToken, categoriesController.addNewSubCategory)
router.route('/admin/addproduct').post(tokenController.authenticateToken, productsController.addNewProduct)
