const { Product } = require('../models')

const addProduct = async (req, res) => {
  console.log('addProduct endpoint hit')
  try {
    const { name, quantity, unit, price, image, description } = req.body
    const newProduct = new Product({
      name,
      quantity,
      unit,
      price,
      image,
      description
    })
    if (newProduct.image === '')
      newProduct.image =
        'https://previews.123rf.com/images/rusyach/rusyach2302/rusyach230200328/199236110-international-day-of-peace-white-dove-on-a-green-vertical-poster-peace-to-ukraine-vector.jpg'
    await newProduct.save()
    res.status(201).json({ message: 'Product added successfully!' })
  } catch (error) {
    res.status(500).json({ message: 'Error adding product.' })
  }
}

//Update Product
const updateProduct = async (req, res) => {
  try {
    const { name, quantity, unit, price, image, description } = req.body
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, quantity, unit, price, image, description },
      { new: true }
    )
    res.json({
      message: 'Product updated successfully!',
      product: updatedProduct
    })
  } catch (error) {
    res.status(500).json({ message: 'Error updating product.' })
  }
}

//Delete Product
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Product deleted successfully!' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product.' })
  }
}

//Get All Products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products.' })
  }
}

//Get Product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: 'Product not found.' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product.' })
  }
}

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById
}
