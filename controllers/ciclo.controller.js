const express = require('express');
const { check }  = require ('express-validator');
const { getAllCiclos, getCiclo, crearCiclo, actualizarCiclo, deleteCiclo } = require('../services/ciclo.service');
const router = express.Router();

router.get('/', getAllCiclos);

router.get('/getCiclo/:_id', getCiclo);

router.post(
    '/createCiclo',
    [
        check('titulo','El título es requerido').not().isEmpty(),
        check('descripcion','La descripción es requerido').not().isEmpty()
    ],
    crearCiclo
);

router.put(
    '/updateCiclo',
    [
        check('_id','El id es requerido').not().isEmpty(),
    ],
    actualizarCiclo
);

router.delete(
    '/deleteCiclo/:_id',
    [
        check('_id','El id de la sesión es requerido').not().isEmpty(),
    ],
    deleteCiclo
);

module.exports = router;