const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); //active CORS pour toutes les requetes


mongoose.connect('mongodb+srv://kilian:<db_password>@cluster0.kkk12ln.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));