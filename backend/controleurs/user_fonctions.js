const bcrypt = require('bcrypt');
const Token = require('jsonwebtoken');
const user = require('../modèles/User_schema');


exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        console.log(req.body);
        const new_user = new user({
          email: req.body.email,
          password: hash
        });
        new_user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
        
      })
      .catch(error => res.status(500).json({ error }));
  };

  exports.login = (req, res, next) => {
    user.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Aucun compte existant avec cet e-mail !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Votre mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        
                        token: Token.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };