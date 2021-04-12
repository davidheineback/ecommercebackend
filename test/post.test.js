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

describe('POST testing for database routes', () => {
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

// Add a 'admin/addcategory' as parameter to post.
// Add a excisting category as parameter to send.
it('Post a excisting category returns 409 conflict', async done => {
  const res = await request(app)
  .post('/api/v1/admin/addcategory')
  .send(testdata.newdoublymain)
  expect(res.statusCode).toEqual(409)
  done()
})

// Add a 'admin/addsubcategory' as parameter to post.
// Add a excisting subcategory as parameter to send.
it('Post a excisting subcategory returns 200 OK', async done => {
  const res = await request(app)
  .post('/api/v1/admin/addsubcategory')
  .send(testdata.newdoublysub)
  expect(res.statusCode).toEqual(200)
  done()
})

// Add a 'admin/addsubcategory' as parameter to post.
// Add a excisting subcategory as parameter to send.
it('Post a non existing subcategory without maincategory returns 400 Bad request', async done => {
  const res = await request(app)
  .post('/api/v1/admin/addsubcategory')
  .send(testdata.newincompletesub)
  expect(res.statusCode).toEqual(400)
  done()
})

// Add a 'admin/addproduct' as parameter to post.
// Add a excisting product as parameter to send.
it('Post a a excisting product returns 409 conflict', async done => {
  const res = await request(app)
  .post('/api/v1/admin/addproduct')
  .send(testdata.newdoublyproduct)
  expect(res.statusCode).toEqual(409)
  done()
})

// Add a 'admin/addcategory' as parameter to post.
// Add a non excisting category as parameter to send.
it('Post a non excisting category returns 200 OK', async done => {
  const res = await request(app)
  .post('/api/v1/admin/addcategory')
  .send(testdata.newmain)
  expect(res.statusCode).toEqual(200)
  done()
})

// Add a 'admin/addsubcategory' as parameter to post.
// Add a non excisting subcategory as parameter to send.
it('Post a a excisting subcategory returns 200 OK', async done => {
  const res = await request(app)
  .post('/api/v1/admin/addsubcategory')
  .send(testdata.newsub)
  expect(res.statusCode).toEqual(200)
  done()
})


// Add a 'admin/addproduct' as parameter to post.
// Add a non excisting product as parameter to send.
it('Post a non excisting product returns 200 OK', async done => {
  const res = await request(app)
  .post('/api/v1/admin/addproduct')
  .send(testdata.newproduct)
  expect(res.statusCode).toEqual(200)
  done()
})

// Add a 'admin/addategory' as parameter to post.
// Add a non excisting category as parameter to send.
it('Post a non excisting category returns expected data', async done => {
  const res = await request(app)
  .post('/api/v1/admin/addcategory')
  .send(testdata.newmain)
  expect(res.body.searchurl).toEqual('mockup-5')
  expect(res.body.id).toEqual(3)
  done()
})

// Add a 'admin/addsubcategory' as parameter to post.
// Add a non excisting subcategory as parameter to send.
it('Post a non excisting subcategory returns expected data', async done => {
  const res = await request(app)
  .post('/api/v1/admin/addsubcategory')
  .send(testdata.newsub)
  expect(res.body.searchurl).toEqual('subcategory-3')
  expect(res.body.subid).toEqual(3)
  done()
})

// Add a 'admin/addproduct' as parameter to post.
// Add a non excisting product as parameter to send.
it('Post a non excisting product returns expected data', async done => {
  const res = await request(app)
  .post('/api/v1/admin/addproduct')
  .send(testdata.newproduct)
  expect(res.body.name).toEqual(testdata.newproduct.name)
  expect(res.body.itemNr).toEqual(600001)
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
