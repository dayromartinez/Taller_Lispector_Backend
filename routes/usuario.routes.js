const express = require('express');
const { createOrder, getOrders, getOrder, deleteOrder, deleteOrders } = require('../controllers/order.controller');

const router = express.Router();

router.post('/createOrder', createOrder);

router.get('/getOrders', getOrders);

router.get('/getOrder/:id', getOrder);

router.delete('/deleteOrder/:id', deleteOrder);

router.delete('/deleteAllOrders', deleteOrders);

module.exports = router;