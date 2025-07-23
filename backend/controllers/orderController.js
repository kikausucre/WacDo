
const Order = require('../models/Order'); 
const Product = require('../models/Product');
const Menu = require('../models/Menu');


    // Création d'une Commande'
exports.createOrder = async (req, res) => {
  try {
    const { produits = [], supplements = [], nomClient, heureLivraison } = req.body; //recupere dans la requete

    let total = 0;

    
    for (const item of produits) {//calcul le prix des produits
      if (item.type.toLowerCase() === 'produit') {
        const produit = await Product.findOne({ nom: item.nom });
        if (!produit) continue;
        total += produit.prix * (item.quantite || 1);

      } else if (item.type.toLowerCase() === 'menu') { // calcul le prix des menus
        const menu = await Menu.findOne({ nom: item.nom });
        if (!menu) continue;
        total += menu.prix * (item.quantite || 1);
      }
    }

    for (const sup of supplements) { // calcul les supplements 
      total += (sup.prix || 0) * (sup.quantite || 1);
    }

    const nouvelleOrder = new Order({ // cree la commande 
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


//recupere la liste des commandes dans la DB
exports.getAllOrder = (req, res) => {
  Order.find()
    .sort({ heureLivraison: 1 }) //1 pour ordre croissant
    .then(menus => res.status(200).json(menus))
    .catch(error => res.status(400).json({ error }));
};


//Modifie statut de la commande Commande
exports.putOrder = (req, res) => {
const etat = req.body.etat;

 Order.updateOne(
    { _id: req.params.id },
    { $set: { etat } }
 )
    .then(() => res.status(200).json({ message: 'Commande modifié !'}))          
    .catch(error => res.status(400).json({ error }));
};

//Supprime Commande
exports.deleteOrder = (req, res) => {
 Order.deleteOne({_id: req.params.id } )
     .then(() => res.status(200).json({ message: 'Commande supprimé !'}))
     .catch(error => res.status(400).json({ error }));

};

