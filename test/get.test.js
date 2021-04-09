/*eslint-disable */
const fetchGetMethod = require('./getTest.js')

// Add keyword "products" as paramter to the fetchGetMethod to test the products route
test('get existing products without specified category returns 200 OK', async () => {
  expect(
    await fetchGetMethod('products')).toBe(200)
})

// Add keyword "category" as paramter to the fetchGetMethod to test the category route
test('get category names returns 200 OK', async () => {
  expect(
    await fetchGetMethod('category')).toBe(200)
})

// Add 'category/:existing-maincategory' as parameter to fetchGetMethod.
test('get products by existing maincategory returns 200 OK', async () => {
  expect(
    await fetchGetMethod('category/mockup-1')).toBe(200)
})

// Add 'category/:non-existing-maincategory' as parameter to fetchGetMethod.
test('get products by non existing maincategory returns 404 Not Found', async () => {
  expect(
    await fetchGetMethod('category/mock1')).toBe(404)
})

// Add 'subcategory/:existing-subcategory' as parameter to fetchGetMethod.
test('get products by existing subcategory returns 200 OK', async () => {
  expect(
    await fetchGetMethod('subcategory/subcategory-1')).toBe(200)
})

// Add 'subcategory/:non-existing-subcategory' as parameter to fetchGetMethod.
test('get products by non existing subcategory returns 404 Not Found', async () => {
  expect(
    await fetchGetMethod('subcategory/sub1')).toBe(404)
})

// Add a 'product/:existing-productId' as parameter to fetchGetMethod.
test('get product by existing productId returns 200 OK', async () => {
  expect(
    await fetchGetMethod('product/600009')).toBe(200)
})


// Add a 'product/:non-existing-productId' as parameter to fetchGetMethod.
test('get product by non existing productId returns 404 Not Found', async () => {
  expect(
    await fetchGetMethod('product/609')).toBe(404)
})

// Add a non existing route as parameter to fetchGetMethod.
test('get request for non existing route returns 404 Not Found', async () => {
  expect(
    await fetchGetMethod('random')).toBe(404)
})

