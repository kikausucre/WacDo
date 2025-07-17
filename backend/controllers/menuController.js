
const Menu = require('../models/Menu'); //recupere modele BD
const Product = require('../models/Product');

// Crée un menu 
// Permet d'uiliser soit l'_id et soit le nom. 
exports.createMenu = async (req, res) => {
    //Crée un tableau produitsAvecId en recuperant les données de req.body
  try {
    const { nom, description, prix, image, products } = req.body;
    const produitsAvecId = [];

    //Pour chaque produit du tableau
    for (const p of products) {
      let productId = p.productId;

      // Si productId non fourni, on cherche par nom 
      if (!productId && p.nom) {
        const produitTrouve = await Product.findOne({ nom: p.nom });

        if (!produitTrouve) {
          return res.status(404).json({ message: `Produit non trouvé : ${p.nom}` });
        }

        productId = produitTrouve._id;
      }

      if (!productId) {
        return res.status(400).json({ message: `Produit invalide ou manquant` });
      }
      //Permet d'éviter les champs vide
      produitsAvecId.push({
        productId,
        quantity: p.quantity || 1,
        required: p.required || false,
        options: p.options || []
      });
    }

    // Création du nouveau menu
    const nouveauMenu = new Menu({
      nom,
      description,
      prix,
      image,
      products: produitsAvecId
    });

    await nouveauMenu.save();
    res.status(201).json({ message: 'Menu enregistré avec succès !' });

} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création du menu", error });
  }
};

//recupere la liste des menus dans la DB
exports.getAllMenu = (req, res) => {
  Menu.find()
    .then(menus => res.status(200).json(menus))
    .catch(error => res.status(400).json({ error }));
};

//Recupere un menu par son ID 
exports.getMenuById = (req, res) => {
  Menu.findById(req.params.id)
    .then(menu => {
      if (!menu) {
        return res.status(404).json({ message: "Menu non trouvé" });
      }
      res.status(200).json(menu);
    })
    .catch(error => res.status(500).json({ error }));
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

