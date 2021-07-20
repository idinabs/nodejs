const mongoose = require('mongoose')
const { Schema } = mongoose;


const blogModels = new Schema({
    title : {
        type: String,
        required : true,
    },

    content1 : {
        type: String,
        required : true,
    },

    content2 : {
        type: String,
        required: true,
    },

    image : {
        type : String,
        required: true,
    },

    create_at : {
        type: Date,
        default : Date.now,
        required : true,
    }


});

const blog = mongoose.model('Blog', blogModels);
module.exports = blog;