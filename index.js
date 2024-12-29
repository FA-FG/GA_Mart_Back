const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
// const orderRoutes = require('./routes/orderRoutes');

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB . . .')
  })
  .catch((e) => {
    console.error('Connection error', e.message)
  })

// Use routes
// app.use('/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
// app.use('/api/orders', orderRoutes);


app.get('/', (req, res) => {
  res.send('Welcome to the Mart Application Backend!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
