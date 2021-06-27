const jwt = require('jsonwebtoken')
const userModel = require('../models/user-model')
// const cookieParser = require('cookie-parser')
// const express = require('express')
// const app = express()

// // app.use(cookieParser())

const verifyToken = (req, res, next) => { 
    const token = req.cookies['jwt'];
    if (token) {
        jwt.verify(token, 'rabuncode', (error, decodedToken) => {
        if (error) {
            res.redirect('/login')
            console.log('anda tidak berhasil login')
        } else {
            console.log(decodedToken)
            next()
        }
    })
    } else {
        res.redirect('/login')
    }
}


// checkUser
const checkUser = (req, res, next) => {
    const token = req.cookies['jwt'];
    if (token) {
        jwt.verify(token, 'rabuncode', async (error, decodedToken) => {
        if (error) {
            console.log(error.message);
            res.locals.user = null;
            next();

        } else {
            // console.log(decodedToken)
            let user = await userModel.findById(decodedToken.id);
            // console.log(user)
            res.locals.user = user
            next()
        }
    })
    } else {
        res.locals.user = null;
        next(); 
    }
}

module.exports = { checkUser, verifyToken };