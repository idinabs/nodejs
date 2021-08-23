const jwt = require('jsonwebtoken');
const userModels = require('../../models/user/register/userModels');


const verifyToken = (req, res, next) => { 
    const token = req.cookies['jwt'];
    if (token) {
        jwt.verify(token, 'rabuncode', (error, decodedToken) => {
        if (error) {
            res.redirect('/login')
        } else {
            console.log(decodedToken)
            next()
        }
    })
    } else {
        res.redirect('/login')
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