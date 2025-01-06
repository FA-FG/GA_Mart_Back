const { Cart, Product } = require('../models')

//Create or Get Cart for User
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: res.locals.userId }).populate(
      'items.productId'
    )
    if (!cart) {
      cart = new Cart({ userId: res.locals.userId })
      await cart.save()
    }

    res.json(cart)
  } catch (error) {
    console.error('Error fetching cart:', error)
    res.status(500).json({ message: 'Error fetching cart.' })
  }
}

//Add Item to Cart
const addItemToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body
    console.log('Request Body:', req.body)
    console.log('User ID:', res.locals.userId)
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' })
    }

    if (product.quantity < quantity) {
      return res
        .status(400)
        .json({ message: 'Insufficient product quantity available.' })
    }

    //Find the user's cart
    let cart = await Cart.findOne({ userId: res.locals.userId })
    if (!cart) {
      cart = new Cart({
        userId: res.locals.userId,
        items: [{ productId, quantity }]
      })
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      )
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity
      } else {
        cart.items.push({ productId, quantity })
      }
    }
    product.quantity -= quantity
    await product.save()

    await cart.save()
    res.json(cart)
  } catch (error) {
    console.error('Error adding item to cart:', error)
    res.status(500).json({ message: 'Error adding item to cart.' })
  }
}

//Remove Item from Cart
const removeItemFromCart = async (req, res) => {
  try {
    const { productId } = req.body
    const cart = await Cart.findOne({ userId: res.locals.userId })

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      )
      if (itemIndex > -1) {
        const item = cart.items[itemIndex]
        cart.items.splice(itemIndex, 1)

        //Increment the product quantity back
        const product = await Product.findById(productId)
        if (product) {
          product.quantity += item.quantity
          await product.save()
        }
      }
      await cart.save()
    }

    res.json(cart)
  } catch (error) {
    console.error('Error removing item from cart:', error)
    res.status(500).json({ message: 'Error removing item from cart.' })
  }
}

module.exports = {
  getCart,
  addItemToCart,
  removeItemFromCart
}
