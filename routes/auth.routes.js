const express = require('express');
const { register, login} = require('./../controllers/auth.controller');
const validateAuthFields = require('./../validators/auth.validator');

const router = express.Router();

router.post('/register', validateAuthFields, register);
router.post('/login', validateAuthFields, login);

module.exports = router;