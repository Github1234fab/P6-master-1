const express = require('express');
const router = express.Router();

const controleur_user = require('../controleurs/user_fonctions');
router.post('/signup', controleur_user.signup);
router.post('/login', controleur_user.login);

module.exports = router;
