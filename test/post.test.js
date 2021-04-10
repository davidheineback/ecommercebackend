/*eslint-disable */
import mongoose from 'mongoose'
import request from 'supertest'
import { Product } from '../src/models/products.js'
import { SubCategory } from '../src/models/subcategories.js'
import { Category } from '../src/models/categories.js'
import { categorydata, categorydata2, subcategorydata, subcategorydata2, productdata } from './mockdata.js'
import dotenv from 'dotenv'
import { app } from './server.js'
dotenv.config()


describe('POST testing for database routes', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DB_CONNECTION_STRING_TEST, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    await Category.deleteMany()
    await SubCategory.deleteMany()
    await Product.deleteMany()
    await Category.insertMany(categorydata, categorydata2)
    await SubCategory.insertMany(subcategorydata, subcategorydata2)
    await Product.insertMany(productdata)

  })

// Add a 'product/:existing-productId' as parameter to fetchGetMethod.
it('get product by non existing productId returns 404 OK', async done => {
  const res = await request(app)
  .post('/api/v1/admin/addcategory')
  .send(categorydata)
  expect(res.statusCode).toEqual(409)
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
