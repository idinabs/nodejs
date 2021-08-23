const userModels = require('../../models/user/register/userModels');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');






module.exports.registerPage = (req, res) => {
    res.render('../sources/views/user/register/registerPage.ejs', {
        title : 'Rabuncode | Register',
    })
}


const maxAge = 5 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign({id}, 'rabuncode', {
        expiresIn : maxAge,
    } )
}

module.exports.registerPost = async (req, res) => {
    // email check 
    const email = await userModels.findOne({email : req.body.email});
    if (email) {
        // console.log('email ini sudah pernah digunakan');
        res.render('../sources/views/user/register/registerPage.ejs', {
            title : 'Rabuncode | Register',
            message : 'email ini sudah ada',
        })

        return;
    };

    const password = req.body.password;
    const hash = await bcrypt.hash(password, 10);

    const userRegister = await userModels.create({
        username : req.body.username,
        email : req.body.email,
        password : hash,

    }, (error, user) => {
        if ( error ) {
            res.redirect('/register')
            console.log(error)

        } else {
            const token = createToken(user._id);
            res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge})
            res.render('../sources/views/user/register/registerPage.ejs', {
                title : 'Rabuncode | Register',
            })
            
            // res.status(201).json({user : user.email})

        }
    })

    return userRegister;

};


module.exports.loginPage = (req, res) => {
    res.render('../sources/views/user/login/loginPage.ejs', {
        title : 'Rabuncode | Login'
    })
}


module.exports.loginPost = async (req, res) => {
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
        res.render('../sources/views/user/login/loginPage.ejs', {
            title : 'Rabuncode | Login',
            message : 'Password anda salah',
        })

    }
    res.render('../sources/views/user/login/loginPage.ejs', {
        title : 'Rabuncode | Login',
        message : 'Email anda salah',
    })

    

}







