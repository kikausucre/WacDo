const mongoose = require('mongoose');

//Creation schéma PRODUIT
const produitSchema = new mongoose.Schema({
     nom: {type: String, required: true},
     description: {type: String, required: true},
     image: {type: String, required: true},
     prix: {type: Number, required: true},
     disponible: {type: Boolean, required: true},

});
const Produit = mongoose.model('Produit', produitSchema);

module.exports = Produit;
