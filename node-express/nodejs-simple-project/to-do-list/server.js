const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT
const list_router = require('./routes/list-routes')
const user_router = require('./routes/auth/auth')
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/to-do', {useNewUrlParser: true, useUnifiedTopology: true});
const list_controller = require('./controllers/list-controller')
const {verifyToken}  = require('./routes/verify-token')

app.use(cookieParser());




// log middleware
app.use((req, res, next) => {
    const tanggal = new Date()
    console.log('Logged', tanggal)

    next()
})


// server running listening
app.listen(port, () => {
    console.log('anda terhubung ke server')
    console.log('======================================')
    console.log('======================================')
})


// mongoose connection
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:')); 

db.once('open', () => {

    console.log('anda terhubung ke database mongodb')
}) 


// request body
app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 


// static template folder
app.use(express.static('public'))


// templates engine and folder templates
app.set('views', './views') 
app.set('view engine', 'ejs') 



app.get('/',verifyToken, list_controller.index_table) 
app.use(list_router)
app.use(user_router)

// app.use((req, res) => {

//     console.log('Cookie', req.signedCookies)
// })

// link not found
app.use( (req, res, next) => {
    res.status(404).render('layout/error/404')
})