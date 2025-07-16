const express = require('express');
const router = express.Router(); //Creer un router
const productController = require('../controllers/productController');//importe le controleur produit getAllProduits necessaire

router.get('/products', productController.getAllProduits);// recupere la liste des produits
router.get('/products/:id', productController.getProduitById); // recupere un produit par ID
router.post('/products', productController.createProduit); // cree produit
router.put('/products/:id', productController.putProduit); // modifie un produit
router.delete('/products/:id', productController.deleteProduit); // supprime un produit


module.exports = router; 
