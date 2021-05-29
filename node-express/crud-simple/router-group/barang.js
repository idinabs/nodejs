const express =require('express')
const app = express.Router()


let data_barang = [
    {id : 1, name : 'Laptop'},
    {id : 2, name : 'Handphone'},
    {id : 3, name : 'Speaker'},
]


app.route('/barang')
    
    // read data_barang
    .get(function(req, res){
        res.send(data_barang)
    })

    // create data_barang
    .post(function(req, res){
        data_barang.push(req.body)
        res.send(data_barang)
    })


app.route('/barang/:id')

    .put(function(req, res){
        const id = req.params.id
        data_barang.filter( user => {
            if(user.id == id){
                user.id = id
                user.name = req.body.name

                return(user);

            }
        })
    res.json(data_barang)
    })


    .delete(function(req, res){
        let id = req.params.id
        const barang = data_barang.filter(user => user.id != id);
        res.send(barang);
    })

module.exports = app;