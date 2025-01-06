const { User } = require('../models')
const bcrypt = require('bcrypt')
const {
  createToken,
  comparePassword,
  hashPassword
} = require('../middleware/index')

//Register User
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const hashedPassword = await hashPassword(password)
    const newUser = new User({
      username,
      email,
      passwordDigest: hashedPassword
    })
    await newUser.save()
    res.status(201).json({ message: 'User registered successfully!' })
  } catch (error) {
    res.status(500).json({ message: 'Error registering user.' })
  }
}

//Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && (await comparePassword(password, user.passwordDigest))) {
      const token = createToken({ userId: user._id, role: user.role })
      res.json({ token, role: user.role })
    } else {
      res.status(401).json({ message: 'Invalid email or password.' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in.' })
  }
}

const getProfile = async (req, res) => {
  console.log('GET /profile endpoint hit')
  try {
    const user = await User.findById(res.locals.userId).select(
      '-passwordDigest'
    )
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile.' })
  }
}

//Update User Profile
const updateProfile = async (req, res) => {
  try {
    const { username, email, password, profileImg } = req.body
    const updateData = { username, email, profileImg }
    if (password) {
      updateData.passwordDigest = await hashPassword(password)
    }
    const updatedUser = await User.findByIdAndUpdate(
      res.locals.userId,
      updateData,
      { new: true }
    ).select('-passwordDigest')
    res.json(updatedUser)
  } catch (error) {
    res.status(500).json({ message: 'Error updating user profile.' })
  }
}

module.exports = { register, login, getProfile, updateProfile }
