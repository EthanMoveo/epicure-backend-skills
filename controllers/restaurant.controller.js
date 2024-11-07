const Restaurant = require('../models/Restaurant');

const createRestaurant = async (req, res) => {
  const { name, image, chef, dishes } = req.body;

  try {
    const restaurant = new Restaurant({ name, image, chef, dishes });
    await restaurant.save();
    res.status(201).json({ message: 'Restaurant created successfully.', restaurant });
  } catch (error) {
    res.status(500).json({ message: 'Error creating restaurant.', error: error.message });
  }
};

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate('chef').populate('dishes');
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurants.', error: error.message });
  }
};

const getRestaurantById = async (req, res) => {
  const { id } = req.params;

  try {
    const restaurant = await Restaurant.findById(id).populate('chef').populate('dishes');
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found.' });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching restaurant.', error: error.message });
  }
};

const updateRestaurant = async (req, res) => {
  const { id } = req.params;
  const { name, image, chef, dishes } = req.body;

  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      id,
      { name, image, chef, dishes },
      { new: true, runValidators: true }
    );
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found.' });
    }
    res.status(200).json({ message: 'Restaurant updated successfully.', restaurant });
  } catch (error) {
    res.status(500).json({ message: 'Error updating restaurant.', error: error.message });
  }
};

const deleteRestaurant = async (req, res) => {
  const { id } = req.params;

  try {
    const restaurant = await Restaurant.findByIdAndDelete(id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found.' });
    }
    res.status(200).json({ message: 'Restaurant deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting restaurant.', error: error.message });
  }
};

module.exports = {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant
};
