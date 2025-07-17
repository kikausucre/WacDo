const express = require('express');
const router = express.Router(); //Creer un router
const menuController = require('../controllers/menuController');//importe le controleur getAllProduits necessaire

router.get('/menus', menuController.getAllMenu);// recupere la liste des menu
router.get('/menus/:id', menuController.getMenuById); // recupere un menu par ID
router.post('/menus', menuController.createMenu); // cree menu
router.put('/menus/:id', menuController.putMenu); // modifie un menu
router.delete('/menus/:id', menuController.deleteMenu); // supprime un menu

module.exports = router; 
