const express = require('express');
const { registerUser } = require('../controllers/usuario.controller');

const router = express.Router();

router.post('/registerUser', registerUser);

module.exports = router;