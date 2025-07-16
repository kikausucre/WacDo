const express = require('express');
const cors = require('cors');
const app = express();
const productRoutes = require('./routes/productRoutes'); 
const demarrageDataBase = require('./dataBase');

app.use(express.json());

//active CORS pour toutes les requetes
app.use(cors()); 

//lancement DB
demarrageDataBase().then(() => {
  app.listen(3000, () => console.log('Serveur lancé'));
});

//ajoute les routes sous le chemin /api/
app.use('/api', productRoutes);
