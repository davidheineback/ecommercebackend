import mongoose from 'mongoose'

// Create a schema.
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'subcategory name is required.'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'description is required.']
  },
  subid: {
    type: Number,
    unique: true
  },
  searchurl: {
    type: String,
    required: [true, 'searchurl is required.']
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
 * Inserts a new subcategory.
 *
 * @param {object} subCategoryData - ...
 * @returns {Promise<SubCategory>} - ...
 */
schema.statics.insert = async function (subCategoryData) {
  const user = new SubCategory(subCategoryData)
  return user.save()
}

// Create a model using the schema.
export const SubCategory = mongoose.model('SubCategory', schema)
