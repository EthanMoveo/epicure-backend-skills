const User = require('../models/User');

const register = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already been taken.' });
      }
  
      const user = new User({ username, password });
      await user.save();
      res.status(201).json({ message: 'User saved successfully in the database.' });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred: ', error });
    }
  };

module.exports = { register }