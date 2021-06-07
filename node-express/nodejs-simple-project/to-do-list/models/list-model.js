const mongoose = require('mongoose')
const { Schema } = mongoose;


const listSchema = new Schema({

    name : String,
    slug : String,
    description : String,

}, {timestamps : { createdAt: 'created_at' }} )

const list = mongoose.model('List', listSchema);

module.exports = list;