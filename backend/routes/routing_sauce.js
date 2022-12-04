const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const fonctions = require('../controleurs/sauce_fonctions');

router.get('/', auth, fonctions.get_all_sauces);
router.get('/:id', auth, fonctions.get_one_sauce);
router.post('/', auth, multer, fonctions.create_one_sauce);
router.put('/:id', auth, multer, fonctions.modify_sauce);
router.delete('/:id', auth, fonctions.delete_sauce);
router.post("/:id/like", auth, multer, fonctions.like_sauce);

module.exports = router;