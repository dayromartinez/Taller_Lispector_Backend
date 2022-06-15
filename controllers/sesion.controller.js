const express = require('express');
const { check }  = require ('express-validator');
const { getAllSesiones, getSesionesCiclo, getSesion, crearSesion, actualizarSesion, deleteSesion } = require('../services/sesion.service');
const router = express.Router();

router.get('/', getAllSesiones);

router.get('/ciclo/:ciclo', getSesionesCiclo);

router.get('/getSesion/:id', getSesion);

router.post(
    '/createSesion',
    [
        check('titulo','El título es requerido').not().isEmpty(),
        check('descripcion','La descripción es requerido').not().isEmpty(),
        check('fecha','La fecha es requerida').not().isEmpty(),
        check('hora','La hora es requerida').not().isEmpty(),
        check('direccionSesion','La dirección es requerida').not().isEmpty(),
        check('ciclo','El ciclo es requerido').not().isEmpty(),
        check('imagenSesion','La url de la pieza gráfica de la sesión es requerida').not().isEmpty(),
    ],
    crearSesion
);

router.put(
    '/updateSesion',
    [
        check('_id','El id es requerido').not().isEmpty(),
    ],
    actualizarSesion
);

router.delete(
    '/deleteSesion/:id',
    [
        check('id','El id de la sesión es requerido').not().isEmpty(),
    ],
    deleteSesion
);

module.exports = router;