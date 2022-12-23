let jwt = require('jsonwebtoken');


 //MIDDLEWARE QUI VÉRIFIE QUE LE TOKEN EST VALIDE POUR LE TRANSMETTRE ENSUITE AU GESTIONNAIRE DE ROUTE.
module.exports = (req, res, next) => {
   //Bcp de pb peuvent se produire, donc instruction dans un bloc try.
   try {
     // Extraction du Token de la requête entrante. Split pour récupérer le Token[1], sans le Bearer.
       const token = req.headers.authorization.split(' ')[1];
       // Décodage du Token avec la méthode vérify(). On passe le Token et la clefs secrète.
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    // Récupération du userId dans le Token décodé.
       const userId = decodedToken.userId;
       // ajout du userId contenu dans le Token décodé aux routes qui seront appelées par la suite. 
      //  Création de l'objet auth, avec un champ, userId.
       req.auth = { 
           userId: userId
       }; 

//Si le corps de la requête comporte un userId, est-ce qu'il correspond bien au token?
// if (req.body.userId && req.body.userId !== userId) {
//    throw 'Invalid user ID';
//  } else {

    next();
   } catch(error) {
       res.status(401).json({ error });
   }
};