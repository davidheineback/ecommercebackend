import express from 'express'
// import { ProductsController } from '../../../controllers/api/products-controller.js'
// import { CategoriesController } from '../../../controllers/api/categories-controller.js'
// import { FetchController } from '../../../controllers/api/fetch-controller.js'
// import { TokenController } from '../../../controllers/api/token-controller.js'

export const router = express.Router()

// const fetchController = new FetchController()
// const tokenController = new TokenController()
// const productsController = new ProductsController()
// const categoriesController = new CategoriesController()

// Map HTTP verbs and route paths to controller actions.
router.route('/category/:id').get()
