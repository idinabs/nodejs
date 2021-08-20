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



module.exports.contactPost = (req, res) => {
     
    
        const { username, email, message } = req.body;
        contactModels.create({username : username, email : email, message : message}, error => {
            if (error) {
                conosle.log(`data anda gagal di post`);
            } 

            res.redirect('/')
        })
            

        // res.status(201).json(user);


}