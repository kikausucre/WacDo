const express = require('express');
const router = express.Router(); //Creer un router
const productController = require('../controllers/productController');//importe le controleur produit getAllProduits necessaire
const authorize = require('../middleware/roleMiddleware');
const upload = require('../middleware/upload');

router.get('/products', productController.getAllProduits);// recupere la liste des produits
router.get('/products/:id', productController.getProduitById); // recupere un produit par ID
router.post('/products', authorize('admin'), upload.single('image'), productController.createProduit); // cree produit
router.put('/products/:id', authorize('admin'), productController.putProduit); // modifie un produit
router.delete('/products/:id', authorize('admin'), productController.deleteProduit); // supprime un produit


module.exports = router; 
