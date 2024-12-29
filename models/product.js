const { Schema } = require('mongoose')

const productSchema = new Schema({
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
  }
});

module.exports = productSchema;
