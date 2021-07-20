const express = require('express');
const router = express.Router();
const homeContoller = require('../controller/homeController');
const {checkUser} = require('../middleware/verify-login')

router.route('*')
    .get(checkUser)

router.route('/')
    .get(homeContoller.home)

router.route('/pricing')
    .get(homeContoller.pricing)

router.route('/blog')
    .get(homeContoller.blog)
    

router.route('/contact')
    .get(homeContoller.contact)
    .post(homeContoller.contactPost)

router.route('/logout')
    .get(homeContoller.logout)



module.exports = router;