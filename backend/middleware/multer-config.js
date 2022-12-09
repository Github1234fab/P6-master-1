const multer = require('multer');

//Enregistrement des fichiers dans 'images
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
 
  filename: (req, file, callback) => {
    //utilisation du nom d'origine+rempl. espace par _ et ajout timestamp
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

//type de fichiers acceptés
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/bmp": "bmp",
  "image/gif": "gif",
  "image/x-icon": "ico",
  "image/svg+xml": "svg",
  "image/tiff": "tif",
  "image/tif": "tif",
  "image/webp": "webp",
};

//gestion des fichiers image, seulement.
module.exports = multer({storage: storage}).single('image');