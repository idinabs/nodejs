const express = require('express');
const router = express.Router();
const homeContoller = require('../controller/homeController')



router.route('/')
    .get(homeContoller.home)

router.route('/pricing')
    .get(homeContoller.pricing)

router.route('/portfolio')
    .get(homeContoller.portfolio)

router.route('/blog')
    .get(homeContoller.blog)


router.route('/contact')
    .get(homeContoller.contact)
    .post(homeContoller.contactPost)

module.exports = router;