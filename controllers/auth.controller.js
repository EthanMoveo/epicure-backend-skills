const User = require('../models/User');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already been taken.' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({ username, password: hashedPassword });
    await user.save();
    
    res.status(201).json({ message: 'User saved successfully in the database.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred: ', error });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'This username does not exist in the system.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'The password is incorrect.' });
    }

    res.status(200).json({ message: 'Login successful.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred:', error });
  }
};

module.exports = { register, login };
