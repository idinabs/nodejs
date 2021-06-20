const express = require('express')
const router = express.Router()
const list_controller = require('../controllers/list-controller')
const verifyToken  = require('../routes/verify-token')

// router.route('/')
//     .get(verifyToken, list_controller.index_table) 

router.route('/home/icon')
    .get(list_controller.index_icon)


router.route('/home/add')
    .get(list_controller.create)
    .post(list_controller.store)


router.route('/home/:id/edit')
    .get(list_controller.update)
    .post(list_controller.edit)

router.route('/home/:id/delete')
    .post(list_controller.destroy)

router.get('/logout', function (req, res){
    res.redirect('/login'); //Inside a callback… bulletproof!
});


    
module.exports = router;