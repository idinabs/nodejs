const express = require('express')
const app = express()

app.listen(3000, function(){

    console.log('Server Sedang Berjalan')
})

app.get('/', function(req, res){

    res.json(
        {
            User    : 'Abubakar Sidik',
            Provinsi  : 'Nusa Tenggara Barat',
            Kabupaten : 'Dompu',
            Kecamatan : 'Dompu',
        })
})
