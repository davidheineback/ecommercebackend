import mongoose from 'mongoose'

// Create a schema.
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Categoryname is required.'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required.']
  },
  id: {
    type: Number,
    unique: true
  },
  searchurl: {
    type: String,
    required: true
  },
  subs: {
    type: Array
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
    virtuals: true // ensure virtual fields are serialized
  }
})

/**
 * Inserts a new category.
 *
 * @param {object} categoryData - ...
 * @returns {Promise<Category>} - ...
 */
schema.statics.insert = async function (categoryData) {
  const user = new Category(categoryData)
  return user.save()
}

// Create a model using the schema.
export const Category = mongoose.model('Category', schema)
