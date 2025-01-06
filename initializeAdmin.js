const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { User } = require('./models')
const db = require('./db')

const initializeAdminUser = async () => {
  try {
    const adminUser = await User.findOne({ role: 'admin' })

    if (!adminUser) {
      const hashedPassword = await bcrypt.hash('admin123', 10)

      const newUser = new User({
        username: 'admin',
        email: 'admin@gmail.com',
        passwordDigest: hashedPassword,
        role: 'admin'
      })

      await newUser.save()
      console.log('Admin user created successfully!')
    } else {
      console.log('Admin user already exists.')
    }
  } catch (error) {
    console.error('Error initializing admin user:', error)
  }
}

module.exports = initializeAdminUser
