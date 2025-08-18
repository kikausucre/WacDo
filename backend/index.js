//Client : fait une requête HTTP (GET, POST, etc.) 
//index.js : point d’entrée de l’app, applique les middlewares et redirige vers la route appropriée
//Route : définit quel contrôleur gérer la requête
//Contrôleur : contient la logique métier, communique avec la DB ou d’autres services
//Base de données : stocke ou récupère les données
//Réponse : le contrôleur renvoie les données, la route et index.js transmettent au client

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mutler = require('./middleware/upload');
const auth = require('./middleware/auth');
const helmet = require('helmet');
const errors = require('./middleware/error');
const rateLimit = require('express-rate-limit');
const app = express();
const setupSwagger = require('./swaggerConfig');
const productRoutes = require('./routes/productRoutes'); 
const menuRoutes = require('./routes/menuRoutes'); 
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const demarrageDataBase = require('./dataBase');
require('dotenv').config();

app.use(express.static('uploads'));
app.use(express.json());

app.use(helmet());
app.use(cors());                    // CORS + HELMET + RateLimit => Permet de sécuriser API ( rateLimit: limite les requetes,), CORS: Qui peut accéder à mon API, HELMET: Comment protéger mon API contre les attaques 
const limiter = rateLimit({                                                                   
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);


//lancement DB
if (require.main === module) {                //if (require.main === module) => permet de lancer la DB uniquement depuis index.js
demarrageDataBase().then(() => {
  app.listen(3000, () => console.log('Serveur lancé'));
});
}

//ajoute les routes sous le chemin /api/
app.use('/api', userRoutes);
app.use('/api', auth, productRoutes);
app.use('/api', auth, menuRoutes);
app.use('/api', auth, orderRoutes);

app.use(errors);

// Route racine qui redirige vers Swagger 
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});


setupSwagger(app);

module.exports = app;