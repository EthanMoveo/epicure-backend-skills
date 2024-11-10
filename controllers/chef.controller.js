const Chef = require('../models/chef.model');
const Restaurant = require('../models/restaurant.model');

const createChef = async (req, res) => {
  const { name, image, description, restaurants } = req.body;

  try { 
    const chef = new Chef({ name, image, description, restaurants });
    await chef.save();
    res.status(201).json({ message: 'Chef created successfully.', chef });
  } catch (error) {
    res.status(500).json({ message: 'Error while creating chef.', error: error.message });
  }
};

const getAllChefs = async (req, res) => {
  try {
    const chefs = await Chef.find().populate('restaurants');
    res.status(200).json(chefs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chefs.', error: error.message });
  }
};

const getChefById = async (req, res) => {
  const { id } = req.params;

  try {
    const chef = await Chef.findById(id).populate('restaurants');
    if (!chef) {
      return res.status(404).json({ message: 'Chef not found.' });
    }
    res.status(200).json(chef);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chef.', error: error.message });
  }
};

const updateChef = async (req, res) => {
  const { id } = req.params;
  const { name, image, description, restaurants } = req.body;

  try {
    const chef = await Chef.findByIdAndUpdate(
      id,
      { name, image, description, restaurants },
      { new: true}
    );
    if (!chef) {
      return res.status(404).json({ message: 'Chef not found.' });
    }
    res.status(200).json({ message: 'Chef updated successfully.', chef });
  } catch (error) {
    res.status(500).json({ message: 'Error updating chef.', error: error.message });
  }
};

const deleteChef = async (req, res) => {
  const { id } = req.params;

  try {
    const chef = await Chef.findByIdAndDelete(id);
    if (!chef) {
      return res.status(404).json({ message: 'Chef not found.' });
    }

    await Restaurant.updateMany(
      { chef: id },
      { $set: { chef: null } } 
    );


    res.status(200).json({ message: 'Chef deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting chef.', error: error.message });
  }
};
 
module.exports = {
  createChef,
  getAllChefs,
  getChefById,
  updateChef,
  deleteChef
};
