const Menu = require('../models/Menu'); 
const Product = require('../models/Product');

// Création du nouveau menu
exports.createMenu = async (req, res) => {
  try {
    delete req.body._id; // supprime l'ID car pas dans modèle
    const nouveauMenu = new Menu({ ...req.body });
    await nouveauMenu.save();
    res.status(201).json({ message: 'Menu enregistré !' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Récupère tous les menus
exports.getAllMenu = async (req, res) => {
  try {
    const menus = await Menu.find();
    res.status(200).json(menus);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Modifie un menu
exports.putMenu = async (req, res) => {
  try {
    await Menu.updateOne(
      { _id: req.params.id },
      { ...req.body, _id: req.params.id }
    );
    res.status(200).json({ message: 'Menu modifié !' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprime un menu
exports.deleteMenu = async (req, res) => {
  try {
    await Menu.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Menu supprimé !' });
  } catch (error) { 
    res.status(400).json({ error: error.message }); 
  }
};
