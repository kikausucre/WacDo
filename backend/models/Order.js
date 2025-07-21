const mongoose = require('mongoose');

const OrdersSchema = new mongoose.Schema({
  nomClient: { type: String, required: true },
  prixTotal: { type: Number, required: true },
  heureCommande: { type: Date, required: true },
  heureLivraison: { type: Date, required: true },
  produits: [
    {
      type: { type: String, enum: ['Produit', 'Menu'], required: true },
      nom: { type: String, required: true },
      quantite: { type: Number, required: true },
      composition: [
        {
          nom: { type: String, required: true },
          quantite: { type: Number, required: true }
          
        }
      ]
    }
  ],
  supplements: [
    {
      nom: { type: String, required: true },
      prix: { type: Number, required: true },
      quantite: {type: Number, default: 1}
    }
  ],
  etat: {
    type: String,
    enum: ['en attente', 'en préparation', 'prête', 'livré'],
    default: 'en attente',
    required: true
  }
});

const Order = mongoose.model('Order', OrdersSchema);

module.exports = Order;
