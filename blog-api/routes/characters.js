const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const CharactersController = require('../controllers/characters');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './images/characters');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname.split(".")[0] + Date.now());
    }
});
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5 // 5mb
    },
    fileFilter: fileFilter
});

router.get('/', CharactersController.characters_get_all);

router.get('/:characterId', CharactersController.characters_get_one);

router.post('/', auth.isLoggedIn, auth.isAdmin, upload.single('imagePath'), CharactersController.characters_create_character);

router.patch('/:characterId', auth.isLoggedIn, auth.isAdmin, upload.single('imagePath'), CharactersController.characters_update_character);

router.delete('/:characterId', auth.isLoggedIn, auth.isAdmin, CharactersController.characters_delete_character);

module.exports = router;