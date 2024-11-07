const express = require('express');
const {
  createChef,
  getAllChefs,
  getChefById,
  updateChef,
  deleteChef
} = require('../controllers/chef.controller');

const router = express.Router();

router.post('/chef', createChef);
router.get('/chefs', getAllChefs);
router.get('/chef/:id', getChefById);
router.put('/chef/:id', updateChef);
router.delete('/chef/:id', deleteChef);

module.exports = router;
