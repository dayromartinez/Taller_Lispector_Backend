const express = require('express');
const {check}  = require ('express-validator')
const { validateUser } = require('../middlewares/validateUser');
const { createUser, loginUser } = require('../services/user.service');
//const { createUser, loginUser } = require('../services/user.service')

const router = express.Router();

// router.post('/login', loginUser);

// router.post('/register', createUser);

router.post(
    '/register',
    [
        check('name','El nombre es requerido').not().isEmpty(),
        check('email','El email es obligtorio').isEmail().not().isEmpty(), 
        check('password','La contraseña debe tener minimo 6 cataracteres').isLength({min:6}).not().isEmpty(),
        validateUser
    ],
    createUser
);

router.post(
    '/login',
    [
        check('email','El email es obligtorio').isEmail().not().isEmpty(), 
        check('password','La contraseña debe tener minimo 6 cataracteres').isLength({min:6}).not().isEmpty(),
        validateUser
    ],
    loginUser
);


module.exports = router;