const express = require('express');
const router = express.Router();
const homeController = require('../../controllers/home/homeControllers');
const {verifyToken, checkUser} = require('../../middleware/verification/verification')

router.route('*')
    .get(checkUser)

router.route('/')
    .get(homeController.homePage)

router.route('/blog')
    .get(homeController.blogPage)


router.route('/pricing')
    .get(verifyToken, homeController.pricingPage)


router.route('/contact')
    .post(homeController.contactPost)


module.exports = router;