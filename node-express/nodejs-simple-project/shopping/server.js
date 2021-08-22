const express = require('express');
const app = express();
require('dotenv').config();
const homeRoutes = require('./sources/routes/home/homeRoutes');
const userRoutes = require('./sources/routes/user/userAuthRoutes');
const mongoose = require('mongoose');



// server running port
app.listen(process.env.PORT, () => {
    console.log(`server anda konek ke port ${process.env.PORT}`);
})



// database mongodb
mongoose.connect(`${process.env.MONGODB}`, {
    useNewUrlParser : true,
    useUnifiedTopology: true,
});
const database = mongoose.connection;

database.on('open', () => {
    console.log(`database anda konek ke port ${process.env.PORT}`);
});
database.once('error', () => {
    console.log('anda tidak terhubung ke database');
});



// body parsing
app.use(express.urlencoded({ 
    extended : true, 

}));



// template engine and template folder
app.set('views', './views');
app.set('view engine', 'ejs');
app.engine('ejs', require('express-ejs-extend'));




// static folder 
app.use(express.static('public'));




// router
app.use(homeRoutes);
app.use(userRoutes);