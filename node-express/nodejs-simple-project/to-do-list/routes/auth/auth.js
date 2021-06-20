const express = require('express');
const router = express.Router();
const user = require('../../controllers/user-controller')



router.route('/register')
    .get(user.regindex)
    .post(user.reg)



router.route('/login')
    .get(user.logindex)
    .post(user.login)

module.exports = router