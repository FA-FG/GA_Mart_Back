const express = require('express')
const logger = require('morgan')
const cors = require('cors')


const userRoutes = require('./routes/userRouter');
const productRoutes = require('./routes/productRouter');
const cartRoutes = require('./routes/cartRouter');
const orderRoutes = require('./routes/orderRouter');


const PORT = process.env.PORT || 3001

const db = require('./db')

const app = express()
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/products', productRoutes);
app.use('/carts', cartRoutes);



app.use('/', (req, res) => {
  res.send(`Connected!`)
})

app.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT} `)
})
