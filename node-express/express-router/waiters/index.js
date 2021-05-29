const express = require('express');
const router = express.Router();


router.route('/waiters')
    .get(function(req, res){
        res.send('Ini adalah GET request method waiters');
    })

    .post(function(req, res){
        res.send('ini adalah POST request method waiters');
    })
    


router.put('/waiters/:edit',function(req, res){

    res.send('ini adalah PUT request method waiters ke ' + req.params.edit);
})

router.delete('/waiters/:delete', function(req, res){

    res.send('ini adalah DELETE request method waiters ke ' + req.params.delete)
})

module.exports = router;