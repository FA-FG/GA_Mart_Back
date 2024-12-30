const { Schema } = require('mongoose')

const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productIds: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }]
});



module.exports = cartSchema;
