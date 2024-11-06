const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chefSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  restaurants: [{
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
  }]
});

module.exports = mongoose.model('Chef', chefSchema);
