const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const MovesController = require('../controllers/moves');

router.get('/', MovesController.moves_get_all);

router.get('/:moveId', MovesController.moves_get_one);

router.post('/', auth.isLoggedIn, auth.isAdmin, MovesController.moves_create_move);

router.patch('/:moveId', auth.isLoggedIn, auth.isAdmin, MovesController.moves_update_move);

router.delete('/:moveId', auth.isLoggedIn, auth.isAdmin, MovesController.moves_delete_move);

module.exports = router;