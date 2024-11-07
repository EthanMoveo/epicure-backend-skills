const Dish = require('../models/dish.model');
const Restaurant = require('../models/restaurant.model');

const createDish = async (req, res) => {
  const { name, price, ingredients, tags, restaurant } = req.body;
  try {
    const dish = new Dish({ name, price, ingredients, tags, restaurant });
    await dish.save();

    await Restaurant.findByIdAndUpdate(
      restaurant,
      { $push: { dishes: dish._id } }, 
      { new: true }
    );

    res.status(201).json({ message: 'Dish created successfully', dish });
  } catch (error) {
    res.status(500).json({ message: 'Error creating dish', error: error.message });
  }
};

const getAllDishes = async (req, res) => {
  try {
    const dishes = await Dish.find().populate('restaurant');
    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dishes', error: error.message });
  }
};

const getDishById = async (req, res) => {
  const { id } = req.params;

  try {
    const dish = await Dish.findById(id).populate('restaurant');
    if (!dish) {
      return res.status(404).json({ message: 'Dish not found' });
    }
    res.status(200).json(dish);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dish', error: error.message });
  }
};

const updateDish = async (req, res) => {
  const { id } = req.params;
  const { name, price, ingredients, tags, restaurant } = req.body;

  try {
    const dish = await Dish.findByIdAndUpdate(
      id,
      { name, price, ingredients, tags, restaurant },
      { new: true }
    );
    if (!dish) {
      return res.status(404).json({ message: 'Dish not found' });
    }
    res.status(200).json({ message: 'Dish updated successfully', dish });
  } catch (error) {
    res.status(500).json({ message: 'Error updating dish', error: error.message });
  }
};

const deleteDish = async (req, res) => {
  const { id } = req.params;

  try {
    const dish = await Dish.findByIdAndDelete(id);
    if (!dish) {
      return res.status(404).json({ message: 'Dish not found' });
    }
    res.status(200).json({ message: 'Dish deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting dish', error: error.message });
  }
};

module.exports = {
  createDish,
  getAllDishes,
  getDishById,
  updateDish,
  deleteDish
};
