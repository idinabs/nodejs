const express = require('express');
const router = express.Router();
const homeController = require('../../controllers/home/homeControllers');


router.route('/')
    .get(homeController.homePage)

router.route('/blog')
    .get(homeController.blogPage)


router.route('/pricing')
    .get(homeController.pricingPage)


router.route('/contact')
    .post(homeController.contactPost)


module.exports = router;