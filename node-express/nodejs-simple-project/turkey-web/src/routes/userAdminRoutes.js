const express = require('express');
const router = express.Router();
const adminController = require('../controller/userAdminController');
const store = require('../middleware/multer');
const {verifyToken, checkUser} = require('../middleware/verify-login');
const axios = require('axios')


router.route('*')
    .get(checkUser)

router.route('/admin')
    .get(verifyToken,adminController.adminPage)


router.route('/adminBlog')
    .get(verifyToken, adminController.blogPage)
    .post(verifyToken, store.single('images'),adminController.blogUploads)

router.route('/adminPortfolio')
    .get(verifyToken, adminController.portfolioPage)
    .post(verifyToken, store.single('images'),adminController.uploads)

// router.route('/adminAPI')
//     .get(adminController.getAPI)

module.exports = router