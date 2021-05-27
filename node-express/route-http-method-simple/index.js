const express = require('express')
const app = express()


app.get('/', function(req, res){
    
    res.send('this is main form')
})

app.get('/user', function(req, res){
    res.send('This is GET user')
})

app.post('/user', function(req, res){
    res.send('This is POST user')
})

app.put('/user', function(req, res){
    res.send('This is PUT user')
})

app.delete('/user', function(req, res){
    res.send('This is DELETE user')    
})

app.listen(3000, function(){

    console.log('server is okay')
})

