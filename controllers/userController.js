const { User } = require('../models');
const middleware = require('../middleware');

const createUser = async (req, res) => {
  try {
    const { username, email, password, profileImg } = req.body;
    const passwordDigest = await middleware.hashPassword(password);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('A user with that email has already been registered!');
    } else {
      const user = await User.create({ username, email, passwordDigest, profileImg });
      res.status(200).send(user);
    }
  } catch (error) {
    throw error;
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const registerUser = async (req, res) => { 
    try { 
        const { username, email, password, profileImg } = req.body; 
        const passwordDigest = await middleware.hashPassword(password); 
        const existingUser = await User.findOne({ email }); 
        if (existingUser) { 
            return res.status(400).send('A user with that email has already been registered!'); 
        } else { 
            const user = await User.create({ username, email, passwordDigest, profileImg }); 
            res.status(200).send(user); 
        } 
    } catch (error) { 
        throw error; 
    } 
};

const loginUser = async (req, res) => { 
    try { 
        const { email, password } = req.body; 
        const user = await User.findOne({ email }); 
        if (!user) { 
            return res.status(404).send('User not found'); 
        } 
        const passwordMatch = await middleware.comparePassword(password, user.passwordDigest); 
        if (passwordMatch) { 
            const payload = { id: user._id, username: user.username, email: user.email }; 
            const token = middleware.createToken(payload); 
            res.status(200).send({ user: payload, token }); 
        } else { 
            res.status(401).send({ status: 'Error', msg: 'Invalid credentials' }); 
        } } catch (error) { 
            res.status(400).send({ error: error.message }); 
        } 
    };

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  registerUser,
  loginUser
};
