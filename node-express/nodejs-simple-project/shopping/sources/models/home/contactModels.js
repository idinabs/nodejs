const mongoose = require('mongoose');
const { Schema } = mongoose;
const { isEmail } = require('validator')



const ContactSchema = new Schema({
    username : {
        type : String,
        required : [true, 'please enter username'],

    },

    email : {
        type : String,
        required : [true,'please enter email'],
        validate : [isEmail, 'please enter a valid email'],
    },

    message : {
        type : String,
        required : [true, 'please enter message'],
        minlength : [6, 'please enter 6 character'],
        maxlength : [10, 'please enter 10 character']
    }
})


const contact = mongoose.model('Contact', ContactSchema);

module.exports = contact;