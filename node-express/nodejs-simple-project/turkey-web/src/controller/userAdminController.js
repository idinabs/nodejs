const portfolioModels = require('../models/admin/modelsPortfolio');
const blogModels = require('../models/admin/modelsBlog');
const multer = require('multer');
const fs = require('fs');
const midtransClient = require('midtrans-client');


module.exports.adminPage = (req, res) => {
    blogModels.find((err, data) => {
        if(err) {
            res.render('apps/userAdmin/adminPage');

        } else {
            res.render('apps/userAdmin/adminPage', {data : data, count: data.length});

        };
    })
}


module.exports.blogPage = (req, res) => {
    res.render('apps/userAdmin/blogPage');

}
module.exports.blogUploads = async (req, res) => {
    const files = req.file;
    if(!files) {
        const msg = 'Masukan file berupa png/jpeg/jpg'
        res.render('apps/userAdmin/blogPage', {msg : msg});

    } else {
        const blog = await blogModels.create({
            title : req.body.title,
            content1 : req.body.content1,
            content2 : req.body.content2,
            image : req.file.path,
    
        }, (err, blog) => {
            if(err) {
                res.render('apps/userAdmin/blogPage');
 
            } else {
                res.redirect('/adminBlog');
                // console.log(blog);
    
            }
        })

        return blog;


    }
}



module.exports.portfolioPage = (req, res) => {
    res.render('apps/userAdmin/portfolioPage');

}

module.exports.uploads = (req, res, next) => {
    const files = req.file;
    
    if(!files) {
        const msg = 'silahkan masukan data berupa png/jpg/jpeg';
        res.render('apps/userAdmin/portfolioPage',{msg : msg});

    } 
    portfolioModels.create({image: req.file.path}, (err, data) => {
        if(err) {
            const msg = 'data anda tidak bisa diinput';
            res.render('apps/userAdmin/portfolioPage', {msg : msg});
 
        } else {
            res.redirect('/adminPortfolio');
 
        }

    })    
}


// module.exports.getAPI = (req, res) => {
     

//     let core = new midtransClient.CoreApi({
//         isProduction : false,
//         serverKey : 'SB-Mid-server-wzu1_pINABa7_OZv0jiQy4Nh',
//         clientKey : 'SB-Mid-client-Mkw9mJUdTtYd11dF'
//     });

//      let parameter = {
//         "payment_type": "credit_card",
//         "transaction_details": {
//             "gross_amount": 12145,
//             "order_id": "test-transaction-54321",
//         },
//         "credit_card":{
//             "token_id": 'CREDIT_CARD_TOKEN', // change with your card token
//             "authentication": true
//         }
//     };

//     core.charge(parameter)
//     .then((chargeResponse)=>{
//         console.log('chargeResponse:');
//         res.json(chargeResponse);
//     });
    
// }