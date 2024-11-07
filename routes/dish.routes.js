// routes/dishRoutes.js
const express = require('express');
const {
  createDish,
  getAllDishes,
  getDishById,
  updateDish,
  deleteDish
} = require('../controllers/dish.controller');

const router = express.Router();

router.post('/', createDish);
router.get('/', getAllDishes);
router.get('/:id', getDishById);
router.put('/:id', updateDish);
router.delete('/:id', deleteDish);

module.exports = router;
