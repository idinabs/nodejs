const express = require('express')
const app = express()
const port = 3001
const list_router = require('./routes/list-routes')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/to-do', {useNewUrlParser: true, useUnifiedTopology: true});



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


app.use(list_router)