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



module.exports = {
  createCart,
  getCart,

};
