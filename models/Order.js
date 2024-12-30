const { Schema } = require('mongoose')

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cartId: { 
    type: Schema.Types.ObjectId,
     ref: 'Cart',
     required: true 
  },
  time: {
    type: Date,
    default: Date.now
  },
  date: {
    type: Date,
    default: Date.now
  }, 
  totalPrice: { 
    type: Number, 
    required: true
  }
});



module.exports = orderSchema;
