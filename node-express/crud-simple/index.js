const express = require('express');
const app = express();
const User = require('./router-group/user')
const Barang = require('./router-group/barang')

// API Request Body Express
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.listen(3000, function (req, res) {
    console.log('server anda terhubung');    
})

app.get('/', function (req, res) {
    res.send('this is a GET method root page')
})

app.use(User);
app.use(Barang);