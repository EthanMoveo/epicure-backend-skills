const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0, 
  },
  ingredients: {
    type: [String],
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant', 
    required: true
  }
});

module.exports = mongoose.model('Dish', dishSchema);
