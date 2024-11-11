const validateAuthFields = (req, res, next) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(422).json({ message: 'Username and password are required.' });
    }
  
    next();
  };
  
  module.exports = validateAuthFields;