const Sauce = require('../modèles/sauce_schema');
const fs = require('fs');


// récupérer toutes les sauces
exports.get_all_sauces =  (req, res, next) => {
  Sauce.find()
  .then(sauces => res.status(200).json(sauces))
  .catch(error => res.status(400).json({error}))
};

// création d'une sauce
exports.create_one_sauce = (req, res, next) => {
  const objet_sauce = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
      ...objet_sauce,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });
    sauce.save()
    .then(() => res.status(201).json({message: 'Sauce enregistrée !'}))
    .catch( error => res.status(400).json({error}) );
    };


// récupération d'une sauce
exports.get_one_sauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
  .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({error}));
};


//modifier une sauce
exports.modify_sauce = (req, res, next) => {
  const objet_sauce = req.file ? {...JSON.parse(req.body.Sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
  delete objet_sauce._userId;
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
  .then(() => res.status(200).json({ message: 'La sauce à bien été modifiée!' }))
  .catch(error => res.status(400).json({ error }));
};


// effacer une sauce
exports.delete_sauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id})
      .then(sauce => {if (Sauce.userId != req.auth.userId) {res.status(401).json({message: 'Action non authorisée'})}
           else {
        const filename = Sauce.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {
                  Sauce.deleteOne({_id: req.params.id})
                      .then(() => { res.status(200).json({message: 'La sauce a bien été supprimée !'})})
                      .catch(error => res.status(401).json({ error }));
              });}})
      .catch( error => {res.status(500).json({ error });});};


// liker une sauce
exports.like_sauce = (req, res, next) => {
    let id_evaluateur = req.body.userId;
    let likes = req.body.like; // on passe ".like" parce que c la route et pas .likes parce que ce le modèle, mais je ne comprends pas bien pour quelle raison?
  // récupération de la sauce avec paramis.id


  Sauce.findOne({_id: req.params.userId})
  .then((sauce) => {
  switch (req.body.like){
  case 0: 
    Sauce.updateOne(
      { _id: req.params.id },
      {$inc: { likes : -1},  $push: { userDisliked: req.body.userId}}
    )
    .then(() => res.status(201).json({ message: 'choix annulé' }))
      .catch(error => res.status(400).json({ error }))
   break;

   case 1: 
   Sauce.updateOne(
     { _id: req.params.id },
     {$inc: { likes : 1},  $push: { userliked: req.body.userId}}
   )
   .then(() => res.status(201).json({ message: 'Sauce likée' }))
     .catch(error => res.status(400).json({ error }))
  break;

  case -1: 
  Sauce.updateOne(
    { _id: req.params.id },
    {$inc: { likes : -1},  $push: { userDisliked: req.body.userId}}
  )
  .then(() => res.status(201).json({ message: 'Sauce dislikée' }))
    .catch(error => res.status(400).json({ error }))
 break;
  }
})
.catch (error => res.status(500).json({error}))
}


