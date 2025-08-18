const express = require('express');
const router = express.Router(); //Creer un router
const orderController = require('../controllers/orderController');//importe le controleur getAllorder necessaire
const authorize = require('../middleware/roleMiddleware');


router.get('/orders', authorize('preparateur', 'admin'), orderController.getAllOrder);// recupere la liste des commandes
router.post('/orders', authorize('accueil', 'admin'), orderController.createOrder); // cree une commande
router.put('/orders/:id', orderController.putOrder); // change l'etat d'une commande
router.delete('/orders/:id', authorize('accueil', 'admin'), orderController.deleteOrder); // supprime une commande

module.exports = router; 

