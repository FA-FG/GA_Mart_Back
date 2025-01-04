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

    const userId = res.locals.payload.id;

    // Fetch the user's cart and populate the productId field with product data
    const cart = await Cart.findOne({ userId: userId }).populate('productIds.productId');
    
    if (!cart) {
      return res.status(404).send('Cart not found');
    }

    console.log(cart);

    res.status(200).send(cart);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}


const removeFromCart = async (req, res) => {
  try {
    const userId = res.locals.payload.id; // Get user ID from the token payload
    const { productId } = req.body; // Get productId from the request body
    console.log(productId)
    // Find the cart for the user
    const cart = await Cart.findOne({ userId });
    // console.log(cart)
    // if (!cart) {
    //   return res.status(404).send('Cart not found');
    // }

    // Find the index of the productId in the cart's productIds array
    const productIndex = cart.productIds.findIndex(item => item.productId.toString() === productId);

    if (productIndex === -1) {
      return res.status(404).send('Product not found in cart');
    }

    // Remove the product from the cart
    cart.productIds.splice(productIndex, 1);

    // Save the updated cart
    await cart.save();

    // Return the updated cart
    res.status(200).send(cart);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

  

const addToCart = async (req, res) => {
  try {
    const {productId, quantity} = req.body;  
    // const { userId } = req.params; // Get userId from URL parameter
    console.log(productId);
    console.log(quantity);

    const cart = await Cart.findOne({ userId: res.locals.payload.id });
    console.log(cart)

    
    const existingProduct = cart.productIds.find(item => item.productId.toString() === productId);

    if (existingProduct) {
      // If product already in cart, increment its quantity
      existingProduct.quantity += quantity;
    } else {
      // If product not in cart, add it with quantity 1
      cart.productIds.push({ productId, quantity });


    }

    await cart.save();

    // res.status(200).send(cart);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}





module.exports = {
  createCart,
  getCart,
  addToCart,
  removeFromCart
};
