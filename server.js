const express = require('express')
const app = express()
const logger = require('morgan')
const cors = require('cors')
const initializeAdminUser = require('./initializeAdmin')
const db = require('./db')
const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes')

const PORT = process.env.PORT || 3001

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/auth', authRoutes)
app.use('/products', productRoutes)
app.use('/cart', cartRoutes)
app.use('/orders', orderRoutes)

initializeAdminUser()
app.use('/', (req, res) => {
  res.send(`You are connected to the backend.`)
})

app.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT} `)
})

db.on('error', (error) => {
  console.error('Database connection error:', error)
})
