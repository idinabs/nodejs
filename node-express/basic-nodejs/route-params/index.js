const express = require('express')
const app = express()


app.get('/user/:id/', function(req, res){
    res.send('User Id' + ' : ' + req.params.id)
})

app.listen(3000, function(){
    console.log('server anda sedang berjalan')
})