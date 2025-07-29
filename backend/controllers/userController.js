const User = require('../models/User');
const authorize = require('../middleware/roleMiddleware');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// enregistrement d'un user 
exports.createUser = async (req, res) => {
  const {username, password, role} = req.body;
  const hashPassword = await bcrypt.hash(password, 10);

  const user = new User({username, password: hashPassword, role});
  await user.save();

  res.status(201).json({message: 'Utilisateur crée'});



};

//login, verifie user et password et attribut token
exports.userLogin = async (req, res) =>{
  const {username, password} = req.body;
  const user = await User.findOne({username});
  if(!user)
    return res.status(404).json({message : 'Utilisateur/mot de passe incorrect'});
  
  const isPasswordCorrect = await bcrypt.compare(password, user.password); //compare le mdp avec le hash de la db
  
  if(!isPasswordCorrect)
    return res.status(404).json({message : 'Utilisateur/mot de passe incorrect'});

  const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn:'1h'});
  res.json({token})

};


//recupere les users
exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

//suprimmer un user
exports.delUsers = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });

    res.json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};


