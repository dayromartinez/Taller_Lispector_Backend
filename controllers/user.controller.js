const express = require('express');
const { registerUser, test } = require('../services/user.service');

const router = express.Router();

router.post('/registerUser', registerUser);

router.post('/test', test);

module.exports = router;