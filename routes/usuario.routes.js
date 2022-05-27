const express = require('express');
const { registerUser } = require('../controllers/order.controller');

const router = express.Router();

router.post('/registerUser', registerUser);

module.exports = router;