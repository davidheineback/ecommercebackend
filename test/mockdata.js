export const testdata = {
  productdata: {
    name: 'TEST PRODUCT',
    description: 'description TEST',
    detailedDescription: 'detail description TEST',
    price: 100,
    discount: 1,
    productCategory: [1],
    productSubCategory: [2],
    inStock: 10,
    image: '',
    brand: 'TEST Brand',
    itemNr: '600000',
    options: [],
    reviews: [],
    rating: 0
  },
  categorydata: {
    name: 'Mockup 1',
    description: 'MOCKUP CATEGORY 1',
    id: 1,
    searchurl: 'mockup-1',
    subs: [{
      name: 'Subcategory 1',
      description: 'SUB TEST 1 DESCRIPTION',
      subid: 1,
      searchurl: 'subcategory-1'
    }, {
      name: 'Subcategory 2',
      description: 'SUB TEST 2 DESCRIPTION',
      subid: 2,
      searchurl: 'subcategory-2'
    }]
  },
  categorydata2: {
    name: 'Mockup 2',
    description: 'MOCKUP CATEGORY 2',
    id: 2,
    searchurl: 'mockup-2',
    subs: []
  },
  subcategorydata: {
    name: 'Subcategory 1',
    description: 'SUB TEST 1 DESCRIPTION',
    subid: 1,
    searchurl: 'subcategory-1'
  },
  subcategorydata2: {
    name: 'Subcategory 2',
    description: 'SUB TEST 2 DESCRIPTION',
    subid: 2,
    searchurl: 'subcategory-2'
  },
  newdoublymain: {
    name: 'Mockup 1',
    description: 'MOCKUP CATEGORY 2'
  },
  newdoublysub: {
    name: 'Subcategory 1',
    mainCategory: 'Mockup 1',
    description: 'SUB TEST 1 DESCRIPTION'
  },
  newdoublyproduct: {
    name: 'TEST PRODUCT',
    description: 'description TEST',
    detailedDescription: 'detail description TEST',
    price: '100',
    discount: 1,
    productCategory: 'Mockup 1',
    productSubCategory: 'Subcategory 2',
    inStock: 10,
    image: '',
    brand: 'TEST Brand',
    options: ''
  },
  newmain: {
    name: 'Mockup 5',
    description: 'MOCKUP CATEGORY 5'
  },
  newincompletesub: {
    name: 'Subcategory 4',
    mainCategory: '',
    description: 'SUB TEST 4 DESCRIPTION'
  },
  newsub: {
    name: 'Subcategory 3',
    mainCategory: 'Mockup 1',
    description: 'SUB TEST 3 DESCRIPTION'
  },
  newproduct: {
    name: 'NEW PRODUCT TEST',
    description: 'description TEST',
    detailedDescription: 'detail description TEST',
    price: '100',
    discount: 1,
    productCategory: 'Mockup 1',
    productSubCategory: 'Subcategory 1',
    inStock: 10,
    image: '',
    brand: 'TEST Brand',
    options: ''
  }
}
