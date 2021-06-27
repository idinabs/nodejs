const Contact = require('../models/contactModels')
const path = require('path')


module.exports.home = (req, res) => {
    res.render('index')
}

module.exports.pricing = (req, res) => {
    res.render('pricingbox')
}

module.exports.portfolio = (req, res) => {
    res.render('portfolio')
}

module.exports.blog = (req, res) => {
    res.render('blog')
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
            // res.json({ 
            //     status : true,
            //     data : contact,
            //     method : req.method,
            //     url : req.url
            // })
            // console.log(contact)
        }
    })


}