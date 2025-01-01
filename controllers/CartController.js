const { Cart, Product } = require('../models');
const middleware = require('../middleware');

const createCart = async (req, res) => {
  try {
    const cart = await Cart.create(req.body);
    res.status(201).send(cart);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id }).populate('productIds');
    if (!cart) {
      return res.status(404).send('Cart not found');
    }
    res.status(200).send(cart);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};



const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;  // Assuming the body contains productId and quantity
    const { userId } = req.params; // Get userId from URL parameter

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send('Product not found');
    }

    // Find or create the user's cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      // Create a new cart if none exists
      cart = new Cart({ userId, productIds: [] });
    }

    // Add product to the cart (without duplicating)
    const existingProductIndex = cart.productIds.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (existingProductIndex !== -1) {
      // Update the quantity if product already exists
      cart.productIds[existingProductIndex].quantity += quantity;
    } else {
      // Add new product to the cart
      cart.productIds.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).send(cart);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  addToCart,
};

const removeProductFromCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) {
      return res.status(404).send('Cart not found');
    }
    const index = cart.productIds.indexOf(req.body.productId);
    if (index > -1) {
      cart.productIds.splice(index, 1);
      await cart.save();
    }
    res.status(200).send(cart);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  createCart,
  getCart,
  addToCart,
  removeProductFromCart
};
