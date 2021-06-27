const express = require('express');
const app = express();
const user_model = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

app.use(cookieParser());


const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'rabuncode', {
        expiresIn : maxAge
    })
}

module.exports = {
    regindex : async (req, res) => {

        res.render('layout/register/register')
    },


    reg : async (req, res) => {

        const email = await user_model.findOne({ email : req.body.email})
        if(email){

          message = "email sudah digunakan"
          res.render('layout/register/register', {msg : message})
          return
        } 

        // const {name, email, password} = req.body;
        const password = req.body.password
        const hash = await bcrypt.hash(password, 10)

        try {

            const user = await user_model.create({ 

                name : req.body.name,
                email : req.body.email,
                password : hash,

             });
            const token = createToken(user._id)
            res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge});
            res.status(201).json({user : user._id})
            // console.log(req.headers.cookies)

        }catch (error) {

            res.status(400).json(error);
        }

        // const email = await user_model.findOne({ email : req.body.email})
    
        // const password = req.body.password
        // const hash = await bcrypt.hashSync(password, 10)
        // // const email = req.body.email
    
        // if(email){

        //     message = "email sudah digunakan"
        //     res.render('layout/register/register', {msg : message})
        //     return
        // } else {
            
        //     try {

        //         const user = await user_model.create( {
        //             name : req.body.name,
        //             email : req.body.email,
        //             password : hash,
        //         })
    
        //         const token = createToken(user._id)
        //         res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge })
                
    
        //     } catch (error) {
    
        //         res.status(400).send(error)
        //     }
        // }

        
        
    },

    logindex : (req, res) => {

        res.render('layout/login/login')
    },

    login : async (req, res) => {


        const { email, password } = req.body;

        try {
            const user = user_model.login(email, password)
            const token = createToken(user._id)
            res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge});
            // res.status(201).json({user : user._id})
            // console.log({ user : user.email});

            // res.status(200).send('ok')

            res.redirect('/')
            
        } catch (err) {
            res.status(400).send('error')
            
        }
        // const user = user_model.login({

        //     email : req.body.email,
        //     password : req.body.password
        // })
        // console.log(email, password)
        // res.send('user berhasil masuk')

        // // cek user using email exist
        // const user = await user_model.findOne({ email: req.body.email})

        // if (user) {
        //     const passValid = await bcrypt.compare( req.body.password, user.password)

        //     if (!passValid) {
        //         // console.log('password anda salah')
        //         message = "password anda salah"
        //         res.render('layout/login/login', {msgPassword : message})

        //     } else {
                
        //         const token = createToken(user._id)
        //         res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge});
        //         console.log( req.cookies.jwt)
        //         // res.redirect('/')

        //     }

        // } else {

        //     message = "email anda salah"
        //     res.render('layout/login/login', {msgEmail : message})
        // }


    //     // User email exist
    //     const User = await user_model.findOne({ email : req.body.email })

    //     if (User) {
    //         const passValid = await bcrypt.compare(req.body.password, User.password)

    //         try {

    //             if (!passValid) {

    //                 message = "password anda salah"
    //                 res.render('layout/login/login', {msgPassword : message})
                    
    //             }else {

    //                 const token = jwt.sign({ _id : User._id}, )
    //                 res.cookie('jwt', token, { HttpOnly : true, maxAge : maxAge })
            
                   
            
    //                 console.log(token)
    //                 // res.send('anda berhasil login')

    //                 res.redirect('/')

    //             }

    //         }catch (error) {
    //             res.status(404).send('error not found')
    //         }
    //     }else{

    //         message = "email anda salah"
    //         res.render('layout/login/login', {msgEmail : message})
    //     }

       

    }
       

}