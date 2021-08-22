const contactModels = require('../../models/home/contactModels');
// const { body, validationResult } = require('express-validator');

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {username : '', email : '', message : ''}


    // validation error
    if(err.message.includes('Contact validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
};


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
            const contact = await contactModels.create({username, email, message});
            res.status(201).json(contact)


        } catch (error){
            const err = handleErrors(error)
            // console.log(err)
            res.send(err)
        }
    
    
    // const { username, email, message } = req.body;
        // contactModels.create({username : username, email : email, message : message}, error => {
        //     if (error) {
        //         conosle.log(`data anda gagal di post`);
        //     } 

        //     res.redirect('/')
        // })
            

        // res.status(201).json(user);


}