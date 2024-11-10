const express = require('express');
const {
  createChef,
  getAllChefs,
  getChefById,
  updateChef,
  deleteChef,
  getChefOfTheWeek
} = require('../controllers/chef.controller');

const router = express.Router();

router.get('/chef-of-the-week', getChefOfTheWeek);
router.post('/', createChef);
router.get('/', getAllChefs);
router.get('/:id', getChefById);
router.put('/:id', updateChef);
router.delete('/:id', deleteChef);

module.exports = router;
