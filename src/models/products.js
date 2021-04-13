import mongoose from 'mongoose'

// Create a schema.
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Productname is required.'],
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required.']
  },
  detailedDescription: {
    type: String
  },
  price: {
    type: Number
  },
  discount: {
    type: Number,
    default: 1
  },
  productCategory: {
    type: Array
  },
  productSubCategory: {
    type: Array
  },
  inStock: {
    type: Number
  },
  image: {
    type: String
  },
  brand: {
    type: String
  },
  itemNr: {
    type: Number,
    required: [true, 'item number is required.'],
    unique: true,
    trim: true
  },
  options: {
    type: Array
  },
  reviews: {
    type: Array
  },
  rating: {
    type: Number
  }
}, {
  timestamps: true,
  versionKey: false,
  toJSON: {
    /**
     * Performs a transformation of the resulting object to remove sensitive information.
     *
     * @param {object} doc - The mongoose document which is being converted.
     * @param {object} ret - The plain object representation which has been converted.
     */
    transform: function (doc, ret) {
      delete ret._id
    },
    virtuals: true // ensure virtual fields are serialized.
  }
})

/**
 * Inserts a new product.
 *
 * @param {object} productData - ...
 * @returns {Promise<Product>} - ...
 */
schema.statics.insert = async function (productData) {
  const user = new Product(productData)
  return user.save()
}

// Create a model using the schema.
export const Product = mongoose.model('Product', schema)
