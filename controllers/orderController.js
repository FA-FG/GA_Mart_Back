const { Order } = require('../models');
const middleware = require('../middleware');

const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).send(order);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send('Order not found');
    }
    res.status(200).send(order);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!order) {
      return res.status(404).send('Order not found');
    }
    res.status(200).send(order);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).send('Order not found');
    }
    res.status(200).send({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder
};