const express = require('express')
const app = express.Router()

const HomeController = require('../controller/controller-users')

let users = [
    { id : 1, name : 'Dayat', email : 'dayat@gmail.com' },
    { id : 2, name : 'harris', email : 'harris@gmail.com' },
];


app.route('/')
    .get(HomeController.index)


app.get('/about', function(req, res){

    res.render('about')

})

app.get('/register', function(req, res){

    res.render('layout/register/register')
})


app.route('/show/:id')
    .get(HomeController.show)


app.route('/users')
    .get(HomeController.home)

    .post(HomeController.create)


app.route('/users/:id')
    .put(HomeController.update)

    .delete(HomeController.delete)


module.exports = app;