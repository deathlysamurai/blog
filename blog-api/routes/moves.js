const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/is-logged-in');
const isAdmin = require('../middleware/is-admin');
const MovesController = require('../controllers/moves');

router.get('/', MovesController.moves_get_all);

router.get('/:moveId', MovesController.moves_get_one);

router.post('/', isLoggedIn, isAdmin, MovesController.moves_create_move);

router.patch('/:moveId', isLoggedIn, isAdmin, MovesController.moves_update_move);

router.delete('/:moveId', isLoggedIn, isAdmin, MovesController.moves_delete_move);

module.exports = router;