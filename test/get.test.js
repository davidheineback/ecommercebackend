/*eslint-disable */
import mongoose from 'mongoose'
import request from 'supertest'
import { Product } from '../src/models/products.js'
import { SubCategory } from '../src/models/subcategories.js'
import { Category } from '../src/models/categories.js'
import { testdata } from './mockdata.js'
import dotenv from 'dotenv'
import { app } from './server.js'
dotenv.config()


describe('Get testing for database routes', () => {
  beforeEach(async () => {
    await mongoose.connect(process.env.DB_CONNECTION_STRING_TEST, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    await Category.deleteMany()
    await SubCategory.deleteMany()
    await Product.deleteMany()
    await Category.insertMany(testdata.categorydata)
    await Category.insertMany(testdata.categorydata2)
    await SubCategory.insertMany(testdata.subcategorydata)
    await SubCategory.insertMany(testdata.subcategorydata2)
    await Product.insertMany(testdata.productdata)

  })

  // Add a non existing route as parameter to fetchGetMethod.
it('get request for non existing route returns 404 Not Found', async () => {
  const res = await request(app)
  .get('/api/v1/random')
expect(res.statusCode).toEqual(404)
})

  // Add keyword "category" as paramter to the fetchGetMethod to test the category route
  it('get category names returns 200 OK', async () => {
    const res = await request(app)
      .get('/api/v1/category')
    expect(res.statusCode).toEqual(200)
})

// Add keyword "products" as paramter to the fetchGetMethod to test the products route
  it('get existing products without specified category returns 200 OK', async () => {
    const res = await request(app)
      .get('/api/v1/products')
    expect(res.statusCode).toEqual(200)
})


// Add 'category/:existing-maincategory' as parameter to fetchGetMethod.
it('get products by existing maincategory returns 200 OK', async done => {
  const res = await request(app)
    .get('/api/v1/category/mockup-1')
  expect(res.statusCode).toEqual(200)
  done()
})

// Add 'category/:non-existing-maincategory' as parameter to fetchGetMethod.
it('get products by non existing maincategory returns 404 Not Found', async done => {
  const res = await request(app)
  .get('/api/v1/category/mock1')
expect(res.statusCode).toEqual(404)
done()
})

// Add 'subcategory/:existing-subcategory' as parameter to fetchGetMethod.
it('get products by existing subcategory returns 200 OK', async done => {
  const res = await request(app)
  .get('/api/v1/subcategory/subcategory-1')
  expect(res.statusCode).toEqual(200)
  done()
})

// Add 'subcategory/:non-existing-subcategory' as parameter to fetchGetMethod.
it('get products by non existing subcategory returns 404 Not Found', async done => {
  const res = await request(app)
  .get('/api/v1/subcategory/sub1')
  expect(res.statusCode).toEqual(404)
  done()
})



// Add a 'product/:existing-productId' as parameter to fetchGetMethod.
it('get product by existing productId returns 200 OK', async done => {
  const res = await request(app)
  .get('/api/v1/product/600000')
  expect(res.statusCode).toEqual(200)
  done()
})

// Add a 'product/:existing-productId' as parameter to fetchGetMethod.
it('get product by non existing productId returns 404 OK', async done => {
  const res = await request(app)
  .get('/api/v1/product/609')
  expect(res.statusCode).toEqual(404)
  done()
})

afterAll(async () => {
    await Category.deleteMany()
    await Product.deleteMany()
    await SubCategory.deleteMany()
    await mongoose.connection.close()
    app.close()
})
})
