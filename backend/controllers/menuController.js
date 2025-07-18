
const Menu = require('../models/Menu'); //recupere modele BD
const Product = require('../models/Product');

    // Création du nouveau menu
exports.createMenu = (req, res) => {
  delete req.body._id; // supprime l'ID car pas dans modèle
  const nouveauMenu = new Menu({
    ...req.body
  });
  nouveauMenu.save()
    .then(() => res.status(201).json({ message: 'Menu enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

//recupere la liste des menus dans la DB
exports.getAllMenu = (req, res) => {
  Menu.find()
    
    .then(menus => res.status(200).json(menus))
    .catch(error => res.status(400).json({ error }));
};


//Modifie Menu
exports.putMenu = (req, res) => {
 Menu.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })  //_id: req.params.id => recupere l'id depuis URL
    .then(() => res.status(200).json({ message: 'Menu modifié !'}))            // ...req.body, _id: req.params.id modifie les donnée avec celle recu dans le corps de la requete et remet l'id pour ne pas l'effacer en modifiant
    .catch(error => res.status(400).json({ error }));
};

//Supprime Menu
exports.deleteMenu = (req, res) => {
 Menu.deleteOne({_id: req.params.id } )
     .then(() => res.status(200).json({ message: 'Menu supprimé !'}))
     .catch(error => res.status(400).json({ error }));

};

