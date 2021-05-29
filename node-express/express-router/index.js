const express = require('express');
const app = express();
const WaitersRouter = require('./waiters/index')

app.listen(2000, function(){
    console.log('server anda sedang berjalan')
})


app.get('/', function(req, res) {

    res.send('ini adalah GET request method');
})

app.post('/about', function(req, res) {

    res.send('ini adalah POST request method');
})

app.use(WaitersRouter);


app.put('/about/:edit', function(req, res) {

    res.send('ini adalah PUT request method ke ' + req.params.edit);
})

app.delete('/about/:delete', function(req, res) {

    res.send('ini adalah DELETE request method ke ' + req.params.delete)
})