const express = require('express');
const app = express();
require('dotenv').config()
// const ejs = require('ejs')
const homeRouter = require('./routes/homeRoutes')
// const authRouter = require('./routes/userAuthRoutes')
const adminRouter = require('./routes/userAdminRoutes')
const mongoose = require('mongoose')
const multer = require('multer'



// mongodb database
mongoose.connect('mongodb://localhost/turkey', {
    useNewUrlParser: true,
    useUnifiedTopology: true}
)
const db = mongoose.connection;
db.on('error', () => {
    console.log('tidak bisa terkonek dengan database')
}) 
db.once('open', () => {
    console.log('sukses konek dengan database')
})



const fileStorage = multer.diskStorage({ 
    destination : (req, file, cb) => { 
        cb(null, 'images');
    },
    filename : (req, file, data) => {
        data(null, new Date().getTime() + '-' + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' || 
        file.mimetype === 'image/jpeg') 
    {
        cb(null, true);
    
    } else {
        cb(null, false);
    
    }
}

// req body express
app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 

// views static engine
app.engine('ejs', require('express-ejs-extend')); 
app.set('views', './views')
app.set('view engine', 'ejs')
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'))


// public statuc folder
app.use(express.static('public'))



// router
app.use(homeRouter)
// app.use(authRouter)
app.use(adminRouter)
app.use((req, res, next) => {
    res.status(400).render('404')
})






// port server running
app.listen(process.env.PORT, () => {
    console.log('server anda sedang berada di port', process.env.PORT)
})
