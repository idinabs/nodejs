const express = require('express')
const app = express()
const user = require('./route/route-users')


// middleware log
app.use(function(req, res, next) {
    const date = new Date()
    console.log('LOGGED', date.toDateString())
    next()
})


// server port
app.listen(3000, function(){
    console.log('server anda sedang berjalan')
})


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
