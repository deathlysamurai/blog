const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const PostsController = require('../controllers/posts');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './images/posts');
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
        fileSize: 1024 * 1024 * 15 // 15mb
    },
    fileFilter: fileFilter
});

router.get('/', PostsController.posts_get_all);

router.get('/:postId', PostsController.posts_get_one);

router.post('/', auth.isLoggedIn, auth.isAdmin, upload.single('imagePath'), PostsController.posts_create_post);

router.patch('/:postId', auth.isLoggedIn, auth.isAdmin, PostsController.posts_update_post);

router.delete('/:postId', auth.isLoggedIn, auth.isAdmin, PostsController.posts_delete_post);

module.exports = router;