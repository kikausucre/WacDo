const express = require('express');
const router = express.Router(); //Creer un router
const menuController = require('../controllers/menuController');//importe le controleur getAllProduits necessaire
const authorize = require('../middleware/roleMiddleware');


router.get('/menus', menuController.getAllMenu);// recupere la liste des menu
router.post('/menus', authorize('admin'), menuController.createMenu); // cree menu
router.put('/menus/:id', authorize('admin'), menuController.putMenu); // modifie un menu
router.delete('/menus/:id', authorize('admin'), menuController.deleteMenu); // supprime un menu

module.exports = router; 
