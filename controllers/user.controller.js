const express = require('express');
const { check }  = require ('express-validator');
const { validarJWTUser } = require('../middlewares/validateJWT');
const { validateUser } = require('../middlewares/validateUser');
const { createUser, loginUser, getUser, getAllEmails } = require('../services/user.service');

const router = express.Router();

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

router.get('/validateToken', validarJWTUser);

router.get('/getAllEmails', getAllEmails);

router.get(
    '/:id', 
    [
        check('id','El id es obligatorio').isMongoId().not().isEmpty(),
        validateUser
    ],
    getUser
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