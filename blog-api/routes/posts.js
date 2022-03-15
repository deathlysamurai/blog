const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/is-logged-in');
const isAdmin = require('../middleware/is-admin');
const PostsController = require('../controllers/posts');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './images/posts');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
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

router.get('/', PostsController.posts_get_all);

router.get('/:postId', PostsController.posts_get_one);

router.post('/', isLoggedIn, isAdmin, upload.single('imagePath'), PostsController.posts_create_post);

router.patch('/:postId', isLoggedIn, isAdmin, PostsController.posts_update_post);

router.delete('/:postId', isLoggedIn, isAdmin, PostsController.posts_delete_post);

module.exports = router;