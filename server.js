const express = require('express')
const logger = require('morgan')
const cors = require('cors')


const AuthRoutes = require('./routes/AuthRouter');
const productRoutes = require('./routes/ProductRouter');
const cartRoutes = require('./routes/CartRouter');
const orderRoutes = require('./routes/OrderRouter');



const PORT = process.env.PORT || 5000

const db = require('./db')

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/auth', AuthRoutes);
app.use('/orders', orderRoutes);
app.use('/products', productRoutes);
app.use('/carts', cartRoutes);



app.use('/', (req, res) => {
  res.send(`Connected!`)
})

app.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT} `)
})
