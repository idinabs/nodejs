const express = require('express');
const router = express.Router();
const userController = require('../controller/userAuthController');

router.route('/signup')
    .get(userController.singupPage)
    .post(userController.signupPost)


router.route('/signin')
    .get(userController.signinPage)
    .post(userController.signinPost)

    
module.exports = router;