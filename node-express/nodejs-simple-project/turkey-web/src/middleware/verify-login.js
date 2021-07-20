const jwt = require('jsonwebtoken');
const userModels = require('../models/user/userModels');

const verifyToken = (req, res, next) => { 
    const token = req.cookies['jwt'];
    if (token) {
        jwt.verify(token, 'rabuncode', (error, decodedToken) => {
        if (error) {
            res.redirect('/signin')
            console.log('anda tidak berhasil login')
        } else {
            console.log(decodedToken)
            next()
        }
    })
    } else {
        res.redirect('/signin')
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies['jwt'];
    if(token) {
        jwt.verify(token, 'rabuncode', async (error, decodedToken) => {
            if(error) {
                console.log('maaf user tidak ada')
                res.locals.user = null;
                next();
            } else {
                let user = await userModels.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    }else {
        res.locals.user = null;
        next();
    }
}
module.exports = {verifyToken, checkUser}