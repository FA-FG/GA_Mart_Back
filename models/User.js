const { Schema } = require('mongoose')

const userSchema = new Schema({
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
    default: ''
  }
},
{ timestamps: true }
)

module.exports = userSchema
