const express = require('express');
const { check }  = require ('express-validator');
const { getAllPublicaciones, getPublicacion, crearPublicacion, actualizarPublicacion, deletePublication, reservarCodigoPublicacion } = require('../services/publication.service');
const router = express.Router();

router.get('/getAll', getAllPublicaciones);

router.get('/:_id', getPublicacion);

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

router.put(
    '/updatePublication',
    [
        check('nombre','El nombre es requerido').not().isEmpty(),
        check('descripcion','El nombre es requerido').not().isEmpty(),
        check('autores','La publicación debe tener autores').isLength({min:1}).not().isEmpty(),
        check('urlDocumento','La publicación debe tener una url de su archivo PDF').isLength({min:10}).not().isEmpty(),
        check('codigosPublicacion','La publicación debe tener códigos de autorización').isLength({min:11}).not().isEmpty(),
    ],
    actualizarPublicacion
);

router.put(
    '/reserveCodePublication',
    [
        check('_id','El id de la publicación es requerido').not().isEmpty(),
        check('uid','El id del usuario es requerido').not().isEmpty(),
        check('nombre','El nombre es requerido').not().isEmpty(),
        check('codigoPublicacion','El código de publicación es requerido').isLength({min:11}).not().isEmpty(),
    ],
    reservarCodigoPublicacion
);

router.delete(
    '/:id',
    [
        check('id','El id es obligatorio').isMongoId().not().isEmpty(),
    ],
    deletePublication
);



module.exports = router;