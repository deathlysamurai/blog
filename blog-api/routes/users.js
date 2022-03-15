const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/is-logged-in');
const isAdmin = require('../middleware/is-admin');
const UsersController = require('../controllers/users');

router.get('/', isLoggedIn, isAdmin, UsersController.users_get_all);

router.get('/:userId', isLoggedIn, UsersController.users_get_one);

router.post('/register', UsersController.users_register_user);

router.post('/login', UsersController.users_login_user);

router.patch('/:userId', isLoggedIn, UsersController.users_update_user);

router.delete('/:userId', isLoggedIn, UsersController.users_delete_user);

module.exports = router;