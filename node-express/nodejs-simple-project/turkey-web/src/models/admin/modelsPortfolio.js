const mongoose = require('mongoose')

const uploadSchema = new mongoose.Schema({

    image : {
        type: String,
        required: true,

    },

})

const uploads = mongoose.model('portfolio', uploadSchema)
module.exports = uploads;