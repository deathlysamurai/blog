const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const TagsController = require('../controllers/tags');

router.get('/', TagsController.tags_get_all);

router.get('/:tagId', TagsController.tags_get_one);

router.post('/', auth.isLoggedIn, auth.isAdmin, TagsController.tags_create_tag);

router.patch('/:tagId', auth.isLoggedIn, auth.isAdmin, TagsController.tags_update_tag);

router.delete('/:tagId', auth.isLoggedIn, auth.isAdmin, TagsController.tags_delete_tag);

module.exports = router;