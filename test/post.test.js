/*eslint-disable */
import mongoose from 'mongoose'
import request from 'supertest'
import { Product } from '../src/models/products.js'
import { SubCategory } from '../src/models/subcategories.js'
import { Category } from '../src/models/categories.js'
import { categorydata,
  categorydata2,
  subcategorydata,
  subcategorydata2,
  productdata,
  newdoublymain,
  newdoublysub,
  newdoublyproduct 
} from './mockdata.js'
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

// Add a 'admin/addcategory' as parameter to post.
// Add a excisting category as parameter to send.
it('Post a a excisting category returns 409 conflict', async done => {
  const res = await request(app)
  .post('/api/v1/admin/addcategory')
  .send(newdoublymain)
  expect(res.statusCode).toEqual(409)
  done()
})

// Add a 'admin/addsubcategory' as parameter to post.
// Add a excisting subcategory as parameter to send.
it('Post a a excisting subcategory returns 409 conflict', async done => {
  const res = await request(app)
  .post('/api/v1/admin/addsubcategory')
  .send(newdoublysub)
  expect(res.statusCode).toEqual(409)
  done()
})


// Add a 'admin/addproduct' as parameter to post.
// Add a excisting product as parameter to send.
it('Post a a excisting product returns 409 conflict', async done => {
  const res = await request(app)
  .post('/api/v1/admin/addproduct')
  .send(newdoublyproduct)
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
