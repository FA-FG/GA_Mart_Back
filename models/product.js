const { Schema } = require('mongoose')

const productSchema = new Schema(
  {
    Name: { type: String },
    Quantity: { type: Number },
    unit: { type: String },
    price: {type: Number}
  },
  { timestamps: true }
)

module.exports = productSchema
