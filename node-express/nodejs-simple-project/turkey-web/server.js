const express = require('express');
const app = express();
require('dotenv').config();
const homeRouter = require('./src/routes/homeRoutes');
const adminRouter = require('./src/routes/userAdminRoutes');
const userRouter = require('./src/routes/userAuthRoutes');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');


app.use(cookieParser())


// mongodb database
mongoose.connect('mongodb://localhost/turk', {
    useNewUrlParser: true,
    useUnifiedTopology: true}
)
const db = mongoose.connection;
db.on('error', () => {
    console.log('tidak bisa terkonek dengan database');
}) 
db.once('open', () => {
    console.log('sukses konek dengan database');
})


// req body express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// views static engine
app.engine('ejs', require('express-ejs-extend')); 
app.set('views', './views');
app.set('view engine', 'ejs');


// public static folder
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));




// router
app.use(homeRouter);
app.use(adminRouter);
app.use(userRouter);
app.use((req, res, next) => {
    res.status(400).render('404');
});






// port server running
app.listen(process.env.PORT, () => {
    console.log('server anda sedang berada di port', process.env.PORT)
})
