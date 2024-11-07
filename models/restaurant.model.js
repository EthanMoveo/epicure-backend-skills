const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  chef: {
    type: Schema.Types.ObjectId,
    ref: 'Chef', 
    required: true,
  },
  dishes: [{
    type: Schema.Types.ObjectId,
    ref: 'Dish', 
  }]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
