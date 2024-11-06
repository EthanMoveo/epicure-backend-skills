const mongoose = require('mongoose');

const connectToDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/epicure');
    console.log('Connection to MongoDB was successful.');
  } catch (error) {
    console.error('An error occurred while trying to connect to MongoDB:', error);
    process.exit(1); 
  }
};

module.exports = connectToDB;
