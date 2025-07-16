//Action necessaire a produit 
// Recupere les produits => GET => getAllProduits => find()
// Recupere un produit par id => GET => getProduitById => findById() => req.params.id
// Creer un produit => POST => save() => ...req.body
//Modifie un produit => PUT => updateOne() => 
// Supprime un produit => DELETE => deleteOne()

const Produit = require('../models/Product'); //recupere modele BD

//recupere la liste des produits dans la DB
exports.getAllProduits = (req, res) => {
  Produit.find()
    .then(produits => res.status(200).json(produits))
    .catch(error => res.status(400).json({ error }));
};

//Recupere un produit par son ID 
exports.getProduitById = (req, res) => {
  Produit.findById(req.params.id)
    .then(produit => {
      if (!produit) {
        return res.status(404).json({ message: "Produit non trouvé" });
      }
      res.status(200).json(produit);
    })
    .catch(error => res.status(500).json({ error }));
};

//Creer un produit
exports.createProduit = (req, res) => {
  delete req.body._id; // supprime l'ID car pas dans modèle
  const nouveauProduit = new Produit({
    ...req.body
  });
  nouveauProduit.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

//ModifieProduit
exports.putProduit = (req, res) => {
 Produit.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })  //_id: req.params.id => recupere l'id depuis URL
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))            // ...req.body, _id: req.params.id modifie les donnée avec celle recu dans le corps de la requete et remet l'id pour ne pas l'effacer en modifiant
    .catch(error => res.status(400).json({ error }));
};

//SupprimeProduit
exports.deleteProduit = (req, res) => {
 Produit.deleteOne({_id: req.params.id } )
     .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
     .catch(error => res.status(400).json({ error }));

};

