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

const addProductToCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) {
      return res.status(404).send('Cart not found');
    }
    const product = await Product.findById(req.body.productId);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    cart.productIds.push(product._id);
    await cart.save();
    res.status(200).send(cart);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
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
  addProductToCart,
  removeProductFromCart
};
