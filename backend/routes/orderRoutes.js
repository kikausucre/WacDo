const express = require('express');
const router = express.Router(); //Creer un router
const orderController = require('../controllers/orderController');//importe le controleur getAllorder necessaire

router.get('/orders', orderController.getAllOrder);// recupere la liste des commandes
router.post('/orders', orderController.createOrder); // cree une commande
router.put('/orders/:id', orderController.putOrder); // change l'etat d'une commande
router.delete('/orders/:id', orderController.deleteOrder); // supprime une commande

module.exports = router; 