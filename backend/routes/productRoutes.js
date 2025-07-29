const express = require('express');
const router = express.Router(); //Creer un router
const productController = require('../controllers/productController');//importe le controleur produit getAllProduits necessaire
const authorize = require('../middleware/roleMiddleware');

router.get('/products', authorize('admin'), productController.getAllProduits);// recupere la liste des produits
router.get('/products/:id', authorize('admin'), productController.getProduitById); // recupere un produit par ID
router.post('/products', authorize('admin'), productController.createProduit); // cree produit
router.put('/products/:id', authorize('admin'), productController.putProduit); // modifie un produit
router.delete('/products/:id', authorize('admin'), productController.deleteProduit); // supprime un produit


module.exports = router; 
