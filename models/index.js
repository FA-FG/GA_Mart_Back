const mongoose = require('mongoose')
const userSchema = require('./User')
const orderSchema = require('./Order')
const cartSchema = require('./Cart')
const productSchema = require('./Product')

const User = mongoose.model('User', userSchema)
const Product = mongoose.model('Product', productSchema)
const Order = mongoose.model('Order', orderSchema)
const Cart = mongoose.model('Cart', cartSchema)

module.exports = {
    User,
    Product,
    Order,
    Cart
}