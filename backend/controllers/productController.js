/* Fonction de base en NodeJS
const nomFonction = async (req, res, next) => {
  try {
    // Code principal : traitement, lecture/écriture en DB, etc.
    res.status(200).json({ message: "Tout va bien" });
  } catch (error) {
    // Si une erreur survient, on la gère ici
    next(error); // ou res.status(500).json({ error })
  }
};
*/





const Produit = require('../models/Product'); // récupère le modèle BD

// Récupère tous les produits
exports.getAllProduits = async (req, res) => {          //try/catch permet de gerer les erreurs
  try {
    const produits = await Produit.find();
    res.status(200).json(produits);
  } catch (error) {
    res.status(400).json({ error });
  }
};

// Récupère un produit par son ID
exports.getProduitById = async (req, res, next) => {
  try {
    const produit = await Produit.findById(req.params.id);
    if (!produit) {
      const err = new Error('Produit non trouvé');
      err.status = 404;
      return next(err); 
    }
    res.status(200).json(produit);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Crée un produit
exports.createProduit = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Image manquante' });

    delete req.body._id;
    const { nom, description, prix, categorie, disponible = true } = req.body;
    const image = req.file.filename; // Multer a récupéré l'image, l'a vérifiée et l'a stockée ; ici on récupère juste le nom du fichier pour le stocker en base ou créer l'URL

    const nouveauProduit = new Produit({
      nom,
      description,
      image,
      prix,
      categorie,
      disponible,
    });

    await nouveauProduit.save();
    res.status(201).json({ message: 'Objet enregistré !' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Modifie un produit
exports.putProduit = async (req, res) => {
  try {
    await Produit.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id });
    res.status(200).json({ message: 'Objet modifié !' });
  } catch (error) {
    res.status(400).json({ error });
  }
};
 
// Supprime un produit 
exports.deleteProduit = async (req, res) => {
  try {
    await Produit.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Objet supprimé !' });
  } catch (error) {
    res.status(400).json({ error });
  }
};
