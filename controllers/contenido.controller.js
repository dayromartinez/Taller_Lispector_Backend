const express = require('express');
const { check }  = require ('express-validator');
const { crearContenido, actualizarContenido, eliminarContenido } = require('../services/contenido.service');
const router = express.Router();


router.post(
    '/createContent',
    [
        check('publicacionId','El id de la publicación es obligatorio').isMongoId().not().isEmpty(),
        check('nombre','El nombre es requerido').not().isEmpty(),
        check('texto','El texto es requerido').not().isEmpty(),
        check('autores','La publicación debe tener autores').isLength({min:1}).not().isEmpty(),
    ],
    crearContenido
);

router.put(
    '/updateContent',
    [
        check('_id','El id del contenido es obligatorio').isMongoId().not().isEmpty(),
        check('publicacionId','El id de la publicación es obligatorio').isMongoId().not().isEmpty(),
        check('nombre','El nombre es requerido').not().isEmpty(),
        check('texto','El texto es requerido').not().isEmpty(),
        check('autores','La publicación debe tener autores').isLength({min:1}).not().isEmpty(),
    ],
    actualizarContenido
);

router.delete(
    '/:_id',
    [
        check('_id','El id es obligatorio').isMongoId().not().isEmpty(),
    ],
    eliminarContenido
);


module.exports = router;