const contactModels = require('../../models/home/contactModels');
const { body, validationResult } = require('express-validator');


const handleErrors = (err) => {
    console.log(err.message, err.code)
}


module.exports.homePage = (req, res) => {
    res.render('../sources/views/home/homePage', {
        title : 'Rabuncode App Untuk Peradaban',
    
    });
};

module.exports.blogPage = (req, res) => {
    res.render('../sources/views/blog/blogPage', {
        title : 'Rabuncode | Blog',
    
    });
}


module.exports.pricingPage = (req, res) => {
    res.render('../sources/views/pricing/pricingPage', {
        title : 'Rabuncode | Pricing',
  
    })
}



module.exports.contactPost = async (req, res) => {
     
    try {
        const { username, email, message } = req.body;
        const user = await contactModels.create(username, email, message);

        res.status(201).json(user);


    }catch (err) {
        handleErrors(err)
        console.log(handleErrors)
    }
}