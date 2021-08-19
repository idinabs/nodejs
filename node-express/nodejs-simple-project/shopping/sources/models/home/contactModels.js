const mongoose = require('mongoose');
const { Schema } = mongoose;




const ContactSchema = new Schema({
    username : {
        type : String,
        required : true,
    },

    email : {
        type : String,
        required : true,
    },

    message : {
        type : String,
        required : true,
        min : 6,
        max : 12,
    }
})


const contact = mongoose.model('Contact', ContactSchema);

module.exports = contact;