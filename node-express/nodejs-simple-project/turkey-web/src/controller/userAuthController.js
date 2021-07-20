const bcrypt = require('bcrypt');
const userModels = require('../models/user/userModels')
const jwt = require('jsonwebtoken');

module.exports.singupPage = (req, res) => {
    res.render('apps/user/signup/signup');

};


const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({id}, 'rabuncode', {
        expiresIn : maxAge,
    } )
}

module.exports.signupPost = async (req, res) => {
    // email check 
    const email = await userModels.findOne({email : req.body.email});
    if (email) {
        console.log('email ini sudah pernah digunakan');

        return;
    };

    const password = req.body.password;
    const hash = await bcrypt.hash(password, 10);

    const userRegister = await userModels.create({
        name : req.body.name,
        email : req.body.email,
        password : hash,

    }, (error, user) => {
        if ( error ) {
            res.redirect('/signup')

        } else {
            const token = createToken(user._id);
            res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge})
            res.render('apps/user/signup/signup')
            
            // res.status(201).json({user : user.email})

        }
    })

    return userRegister;

};


module.exports.signinPage = (req, res) => {
    res.render('apps/user/signin/signin');
}

module.exports.signinPost = async (req, res) => {
   
    // const {password} = req.body;

    // // email check 
    // const email = await userModels.findOne({ email: req.body.email}, (error, user) => {
    //     if(error) {
    //         console.log('maaf email anda salah')
    //     } else {
    //         const auth = await bcrypt.compare(passworrd, user.password)
    //         if (auth) {
    //             const token = createToken(user._id)
    //             res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge});
    //             res.redirect('/', )
          
    //             // return user;
          
    //         } else {
    //             cosnole.log('password anda salah')
    //         }
    //     }
    // })

    // return email;

    

    const { email, password } = req.body;
    
    
    const user = await userModels.findOne({email});
    if( user ) {
        const auth = await bcrypt.compare(password, user.password)
        if ( auth ) {
            const token = createToken(user._id)
            res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge});
            res.redirect('/', )
            return user;
            
          
        }
        res.redirect('/signin');
        console.log('password anda salah')
    }
    res.redirect('/signin');
    console.log('email anda salah')

    



}

