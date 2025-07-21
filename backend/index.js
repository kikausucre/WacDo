const express = require('express');
const cors = require('cors');
const app = express();
const productRoutes = require('./routes/productRoutes'); 
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const demarrageDataBase = require('./dataBase');

app.use(express.json());
app.use(cors()); 

//lancement DB
demarrageDataBase().then(() => {
  app.listen(3000, () => console.log('Serveur lancé'));
});

//ajoute les routes sous le chemin /api/
app.use('/api', productRoutes);
app.use('/api', menuRoutes);
app.use('/api', orderRoutes);
