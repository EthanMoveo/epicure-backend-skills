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
  const { name, price, ingredients, tags, restaurant: newRestaurantId } = req.body;

  try {
    const dish = await Dish.findById(id);

    if (!dish) {
      return res.status(404).json({ message: 'Dish not found' });
    }

    const oldRestaurantId = dish.restaurant;
    if (oldRestaurantId.toString() !== newRestaurantId) {
      await Restaurant.findByIdAndUpdate(oldRestaurantId, { $pull: { dishes: id } });
      await Restaurant.findByIdAndUpdate(newRestaurantId, { $push: { dishes: id } });
    }

    dish.name = name;
    dish.price = price;
    dish.ingredients = ingredients;
    dish.tags = tags;
    dish.restaurant = newRestaurantId;
    
    await dish.save();

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

    await Restaurant.findByIdAndUpdate(
      dish.restaurant,
      { $pull: { dishes: id } } 
    );

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
