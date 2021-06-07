const express = require('express')
const app = express()
const user = require('./route/route-users')


// mongoose connection
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/user', {useNewUrlParser: true, useUnifiedTopology: true});


// middleware log
app.use(function(req, res, next) {
    const date = new Date()
    console.log('LOGGED', date.toDateString())
    next()
})



// server port
app.listen(3000, function(){
    console.log('server anda sedang berjalan')
    console.log("===================================")
    console.log("===================================")
})


// mongoose messages connection
const db = mongoose.connection;
db.on('error', function(){

    console.log('Anda tidak terhubung ke database MongoD')
});
db.once('open', function() {
    console.log('Anda terhubung ke database MongoDB')
  });

// folder public for asset file
app.use(express.static('public'))


// request body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// template engine
app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs') // register the template engine

// route
app.use(user)
