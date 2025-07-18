const mongoose = require('mongoose');

const MenusSchema = new mongoose.Schema({

     nom: {type: String, required: true},
     description: {type: String, required: true},
     prix: {type: Number, required: true},
     image: {type: String, required:true},
     products: [ // liste des produits à inclure dans le menu
    {
      
      quantity: Number,
      required: Boolean, //Indique si ce produit est obligatoire dans le menu
      options: [         // Si supplement
        {
          name: String, 
          values: [String] 
        }
      ]
    }
  ],
});

const Menu = mongoose.model('Menu', MenusSchema);

module.exports = Menu;