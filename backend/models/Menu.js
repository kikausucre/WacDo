const mongoose = require('mongoose');

const MenusSchema = new mongoose.Schema({

     nom: {type: String, required: true},
     description: {type: String, required: true},
     prix: {type: Number, required: true},
     image: {type: String, required:true},
     composition: [
    {
      nom: { type: String, required: true },     
      quantite: { type: Number, required: true}
    }
  ],
});

const Menu = mongoose.model('Menu', MenusSchema);

module.exports = Menu;