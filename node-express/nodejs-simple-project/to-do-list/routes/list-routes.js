const express = require('express')
const router = express.Router()
const list_controller = require('../controllers/list-controller')
const { checkUser, verifyToken }  = require('../routes/verify-token')


router.route('*')
    .get(checkUser)


// router.route('/')
//     .get(list_controller.index)

router.route('/')
    .get(verifyToken, list_controller.index_table) 
    .get(verifyToken, list_controller.index_check) 

router.route('/home/icon')
    .get(verifyToken, list_controller.index_icon)


router.route('/home/add')
    .get(verifyToken, list_controller.create)
    .post(verifyToken,list_controller.store)


router.route('/home/:id/edit')
    .get(verifyToken, list_controller.update)
    .post(verifyToken, list_controller.edit)

router.route('/home/:id/delete')
    .post(verifyToken, list_controller.destroy)

router.route('/logout')
    .get(verifyToken, list_controller.logout)


    
module.exports = router;