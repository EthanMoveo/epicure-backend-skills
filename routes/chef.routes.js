const express = require('express');
const {
  createChef,
  getAllChefs,
  getChefById,
  updateChef,
  deleteChef
} = require('../controllers/chef.controller');

const router = express.Router();

router.post('/createChef', createChef);
router.get('/getChefs', getAllChefs);
router.get('/getChefById/:id', getChefById);
router.put('/updateChef/:id', updateChef);
router.delete('/deleteChef/:id', deleteChef);

module.exports = router;
