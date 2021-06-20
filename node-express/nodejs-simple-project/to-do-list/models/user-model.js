const mongoose = require('mongoose');
const { Schema } = mongoose;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const saltRounds = 10;

const userSchema = new Schema({

    name : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true
    },

    password : {
        type : String,
        required : true,
    },

    create_at : {

        type : Date,
        default : Date.now(),
    }

    
})

userSchema.statics.login = async function (email, password) {
   
     // check user email exist
     const user = await this.findOne({ email })
     if (user){
         const auth = await bcrypt.compare(password, user.password)
         if (auth) {
             return user;
         }
         throw Error('password salah')
     }
     throw Error('email salah')


    // // check user email exist
    // const user = await this.findOne({ email : req.body.email })
    // if (user){
    //     const auth = await bcrypt.compare(req.body.password, user.password)
    //     if (auth) {
    //         return user;
    //     }
    //     throw Error('password salah')
    // }
    // throw Error('email salah')
}

const user = mongoose.model('User', userSchema)

module.exports = user;
