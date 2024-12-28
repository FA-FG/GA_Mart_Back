const { Schema } = require('mongoose')

const cartSchema = new Schema(
  {
    userId: { type: String, },
    productId: { type: String },

  },
  { timestamps: true }
)

module.exports = cartSchema
