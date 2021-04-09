const fetchGetMethod = require('./getTest.js')

test('test get', async () => {
  expect(
    await fetchGetMethod('products')).toBe(200)
})
