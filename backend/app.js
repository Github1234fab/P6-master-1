const express = require('express');
const app = express();
const mongoose = require('mongoose');

const sauces_routes = require('./routes/routing_sauce');
const user_route = require('./routes/routing_user');

const path = require('path');

mongoose.connect('mongodb+srv://FabTest:Coucoulele@cluster0.f0ph9he.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use('/api/auth', user_route);
app.use('/api/sauces', sauces_routes);
// app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/images_folder',express.static(path.join(__dirname,'images_folder')));

module.exports = app;
