const express = require('express');
const router = express.Router();
const adminController = require('../controller/userAdminController')


router.route('/admin')
    .get(adminController.adminPage)



module.exports = router