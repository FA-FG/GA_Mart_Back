const { User } = require('../models')
const { Cart } = require('../models')
const middleware = require('../middleware')

const Register = async (req, res) => { 
  try { 
    const { username, email, password, profileImg } = req.body; 
    const passwordDigest = await middleware.hashPassword(password); 

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email }); 
    if (existingUser) { 
      return res.status(400).send('A user with that email has already been registered!'); 
    } else { 
      // Create the user in the database
      const user = await User.create({ username, email, passwordDigest, profileImg });

      // Now create a cart for the user
      const cart = await Cart.create({
        userId: user._id,  // Associate the cart with the newly created user
        productIds: []     // Initially, the cart will be empty
      });
 
      // Send the user and cart details in the response
      res.status(200).send({
        user,
        cart
      }); 
    } 
  } catch (error) { 
    res.status(500).send({ error: error.message });
  } 
};

const Login = async (req, res) => {
  try {
    // Extracts the necessary fields from the request body
    const { email, password } = req.body
    // Finds a user by a particular field (in this case, email)
    const user = await User.findOne({ email })
    // Checks if the password matches the stored digest
    let matched = await middleware.comparePassword(
      password,
      user.passwordDigest
    )
    // If they match, constructs a payload object of values we want on the front end
    if (matched) {
      let payload = {
        id: user.id,
        email: user.email
      }
      // Creates our JWT and packages it with our payload to send as a response
      let token = middleware.createToken(payload)
      return res.status(200).send({ user: payload, token })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error', msg: 'An error has occurred logging in!' })
  }
}

const getUser = async (req, res) => {
  try {
    const user = await User.findById(res.locals.payload.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const UpdatePassword = async (req, res) => {
  try {
    // Extracts the necessary fields from the request body
    const { oldPassword, newPassword } = req.body
    // Finds a user by a particular field (in this case, the user's id from the URL param)
    let user = await User.findById(req.params.user_id)
    // Checks if the password matches the stored digest
    let matched = await middleware.comparePassword(
      oldPassword,
      user.passwordDigest
    )
    // If they match, hashes the new password, updates the db with the new digest, then sends the user as a response
    if (matched) {
      let passwordDigest = await middleware.hashPassword(newPassword)
      user = await User.findByIdAndUpdate(req.params.user_id, {
        passwordDigest
      })
      let payload = {
        id: user.id,
        email: user.email
      }
      return res.status(200).send({ status: 'Password Updated!', user: payload })
    }
    res.status(401).send({ status: 'Error', msg: 'Old Password did not match!' })
  } catch (error) {
    console.log(error)
    res.status(401).send({
      status: 'Error',
      msg: 'An error has occurred updating password!'
    })
  }
}

const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.status(200).send(payload)
}

module.exports = {
  Register,
  Login,
  getUser,
  UpdatePassword,
  CheckSession
}
