const express = require('express');
const { check }  = require ('express-validator');
const { getAllPublicaciones, getPublicacion, crearPublicacion } = require('../services/publication.service');
const router = express.Router();

router.get('/getAll', getAllPublicaciones);

router.get('/:id', getPublicacion);

router.post(
    '/createPublication',
    [
        check('nombre','El nombre es requerido').not().isEmpty(),
        check('descripcion','El nombre es requerido').not().isEmpty(),
        check('autores','La publicación debe tener autores').isLength({min:1}).not().isEmpty(),
        check('urlDocumento','La publicación debe tener una url de su archivo PDF').isLength({min:10}).not().isEmpty(),
        check('codigosPublicacion','La publicación debe tener códigos de autorización').isLength({min:11}).not().isEmpty(),
    ],
    crearPublicacion
);


module.exports = router;