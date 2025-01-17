const { Schema } = require('mongoose')

const productSchema = Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    default: '',
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

module.exports = productSchema
