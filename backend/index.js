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
app.use(helmet());
app.use(express.json());
app.use(cors()); 

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);
//lancement DB
if (require.main === module) {
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

setupSwagger(app);

module.exports = app;