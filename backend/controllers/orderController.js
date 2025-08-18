const Order = require('../models/Order'); 
const Product = require('../models/Product');
const Menu = require('../models/Menu');

// Création d'une commande
exports.createOrder = async (req, res) => {
  try {
    const { produits = [], supplements = [], nomClient, heureLivraison } = req.body;

    let total = 0;

    for (const item of produits) {
      if (item.type.toLowerCase() === 'produit') {
        const produit = await Product.findOne({ nom: item.nom });
        if (!produit) continue;
        total += produit.prix * (item.quantite || 1);
      } else if (item.type.toLowerCase() === 'menu') {
        const menu = await Menu.findOne({ nom: item.nom });
        if (!menu) continue;
        total += menu.prix * (item.quantite || 1);
      }
    }

    for (const sup of supplements) {
      total += (sup.prix || 0) * (sup.quantite || 1);
    }

    const nouvelleOrder = new Order({
      nomClient,
      heureCommande: new Date(),
      heureLivraison,
      produits,
      supplements,
      prixTotal: total,
      etat: 'en attente'
    });

    await nouvelleOrder.save();

    res.status(201).json({ message: 'Commande enregistrée !', prixTotal: total });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Récupère toutes les commandes
exports.getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find().sort({ heureLivraison: 1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Modifie le statut d'une commande
exports.putOrder = async (req, res) => {
  try {
    const etat = req.body.etat;
    await Order.updateOne({ _id: req.params.id }, { $set: { etat } });
    res.status(200).json({ message: 'Commande modifiée !' });
  } catch (error) {
    res.status(400).json({ error });
  }
};

// Supprime une commande
exports.deleteOrder = async (req, res) => {
  try {
    await Order.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Commande supprimée !' });
  } catch (error) {
    res.status(400).json({ error });
  }
};
