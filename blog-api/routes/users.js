const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const UsersController = require('../controllers/users');

router.get('/', auth.isLoggedIn, auth.isAdmin, UsersController.users_get_all);

router.get('/:userId', auth.isLoggedIn, UsersController.users_get_one);

router.post('/register', UsersController.users_register_user);

router.post('/login', UsersController.users_login_user);

router.patch('/:userId', auth.isLoggedIn, UsersController.users_update_user);

router.delete('/:userId', auth.isLoggedIn, UsersController.users_delete_user);

router.get('/unique/:param', UsersController.users_verify_unique)

module.exports = router;