const express = require('express');
const {
  createChef,
  getAllChefs,
  getChefById,
  updateChef,
  deleteChef
} = require('../controllers/chef.controller');

const router = express.Router();

router.post('/create-chef', createChef);
router.get('/get-chefs', getAllChefs);
router.get('/get-chef-by-id/:id', getChefById);
router.put('/update-chef/:id', updateChef);
router.delete('/delete-chef/:id', deleteChef);

module.exports = router;
