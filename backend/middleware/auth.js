let jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {
     // Récupération du token d'authentification
       const token = req.headers.authorization.split(' ')[1];
       // Décodage Token
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    // Récupération du userId encodé dans le token
       const userId = decodedToken.userId;
       
       req.auth = {
           userId: userId
       };
    next();
   } catch(error) {
       res.status(401).json({ error });
   }
};