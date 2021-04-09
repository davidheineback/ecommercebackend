/*eslint-disable */
const fetchGetMethod = require('./getTest.js')

// Add keyword "products" as paramter to the fetchGetMethod to test the products route
test('test get products', async () => {
  expect(
    await fetchGetMethod('products')).toBe(200)
})

// Add keyword "category" as paramter to the fetchGetMethod to test the category route
test('test get category', async () => {
  expect(
    await fetchGetMethod('category')).toBe(200)
})

// Add a available main category as parameter to fetchGetMethod.
test('test get products by maincategory', async () => {
  expect(
    await fetchGetMethod('category/mockup-1')).toBe(200)
})

// Add a available subcategory as parameter to fetchGetMethod.
test('test get products by subcategory', async () => {
  expect(
    await fetchGetMethod('subcategory/subcategory-1')).toBe(200)
})

// Add a available productId as parameter to fetchGetMethod.
test('test get product by productId', async () => {
  expect(
    await fetchGetMethod('product/600009')).toBe(200)
})


// Add a non available maincategory as parameter to fetchGetMethod.
test('test get products by maincategory', async () => {
  expect(
    await fetchGetMethod('category/mock1')).toBe(404)
})

// Add a non available subcategory as parameter to fetchGetMethod.
test('test get products by subcategory', async () => {
  expect(
    await fetchGetMethod('subcategory/sub1')).toBe(404)
})

// Add a non available productId as parameter to fetchGetMethod.
test('test get product by productid', async () => {
  expect(
    await fetchGetMethod('product/609')).toBe(404)
})

// Add a non available route as parameter to fetchGetMethod.
test('test get random', async () => {
  expect(
    await fetchGetMethod('random')).toBe(404)
})

