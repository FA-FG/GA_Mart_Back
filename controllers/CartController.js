const { Cart, Product , User} = require('../models');

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
    const { productId} = req.body;  // Assuming the body contains productId and quantity
    // const { userId } = req.params; // Get userId from URL parameter

    // Check if the user exists
    const cart = await User.findById(res.locals.payload.id);
    if (cart) {
      cart.productIds.push(productId)
   

    await cart.save();}

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
