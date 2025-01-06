const { Schema } = require('mongoose')

const userSchema = Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  passwordDigest: {
    type: String,
    required: true
  },
  profileImg: {
    type: String,
    default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
})

module.exports = userSchema
