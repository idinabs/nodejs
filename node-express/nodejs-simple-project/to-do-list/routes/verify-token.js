const jwt = require('jsonwebtoken')
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

module.exports = {verifyToken};