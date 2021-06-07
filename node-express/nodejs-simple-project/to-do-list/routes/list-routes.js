const express = require('express')
const router = express.Router()
const list_controller = require('../controllers/list-controller')


router.route('/')
    .get(list_controller.index_table) 


router.route('/home/icon')
    .get(list_controller.index_icon)


router.route('/home/add')
    .get(list_controller.create)
    .post(list_controller.store)


router.route('/home/:id/edit')
    .get(list_controller.update)

    
module.exports = router;