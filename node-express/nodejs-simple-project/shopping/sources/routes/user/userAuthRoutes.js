const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user/userAuthController');

router.route('/register')
    .get(userController.registerPage)
    .post(userController.registerPost)

router.route('/login')
    .get(userController.loginPage)
    .post(userController.loginPost)

module.exports = router;