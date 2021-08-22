const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user/userAuthController');

router.route('/register')
    .get(userController.registerPage)


module.exports = router;