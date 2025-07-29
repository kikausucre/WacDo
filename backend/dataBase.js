// Connexion à la db
require('dotenv').config();
const mongoose = require('mongoose');

function demarrageDataBase() {

return mongoose.connect(process.env.MONGODB_URI,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée ! '));


};

module.exports = demarrageDataBase;