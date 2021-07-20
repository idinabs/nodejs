const Contact = require('../models/contactModels');
const portfolioModels = require('../models/admin/modelsPortfolio');
const blogModels = require('../models/admin/modelsBlog');
const path = require('path');
const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser)


module.exports.home = (req, res) => {
    portfolioModels.find((error, data) => {
        if(error) {
            res.redirect('/');
        } else {
            res.render('index', {data: data})
        }
    })
}

module.exports.pricing = (req, res) => {
    res.render('pricingbox')
}


module.exports.blog = (req, res) => {
    
    let search = {}

    if (req.query.search) {
        search = {title : {$regex : req.query.search, $options: '$i'}}
        
    } 
    
    blogModels.find(search, 'title _id image', (error, data) => {
        if(error) {
            
            res.render('blog')

        } else {
           
            console.log(data)
        // res.json(image)
            res.render('blog', {data})
        }
        

    })
}

module.exports.contact = (req, res) => {
    res.render('contact')
}

module.exports.contactPost = (req, res) => {
    // const {name, email, title, message} = req.body
    // const {image} = req.path


    Contact.create({ 
        name : req.body.name,
        email : req.body.email,
        title : req.body.title,
        message : req.body.message,

    }, (err, contact) => {

        if(err) {
            console.log('data anda tidak bisa di post')

        } else {
            res.redirect('/')

        }
    })


};

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
}
