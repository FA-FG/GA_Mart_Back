const { Order, Cart } = require('../models')

//Create Order
const createOrder = async (req, res) => {
  try {
    const { cartId, totalPrice, items } = req.body
    const cart = await Cart.findById(cartId)

    if (!cart || cart.userId.toString() !== res.locals.userId) {
      return res.status(400).json({ message: 'Invalid cart.' })
    }

    const newOrder = new Order({
      userId: res.locals.userId,
      cartId,
      totalPrice,
      items
    })

    await newOrder.save()

    cart.items = []
    await cart.save()
    res
      .status(201)
      .json({ message: 'Order created successfully!', order: newOrder })
  } catch (error) {
    res.status(500).json({ message: 'Error creating order.' })
  }
}

//Get All Orders (Admin only)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId').populate('cartId')
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders.' })
  }
}

//Get User Orders
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: res.locals.userId }).populate(
      'cartId'
    )
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user orders.' })
  }
}

module.exports = {
  createOrder,
  getAllOrders,
  getUserOrders
}
