const mongoose = require('mongoose')
const userSchema = require('./user')
const productSchema = require('./product')
const cartSchema = require('./cart')
const orderSchema = require('./order')

const User = mongoose.model('User', userSchema)
const Product = mongoose.model('Product', productSchema)
const Cart = mongoose.model('Cart', cartSchema)
const Order = mongoose.model('Order', orderSchema)

module.exports = {
  User,
  Product,
  Cart,
  Order
}
