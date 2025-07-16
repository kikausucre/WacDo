// Connexion à la db

const mongoose = require('mongoose');

function demarrageDataBase() {

return mongoose.connect('mongodb+srv://kilian:WacDo123@cluster0.kkk12ln.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


};

module.exports = demarrageDataBase;