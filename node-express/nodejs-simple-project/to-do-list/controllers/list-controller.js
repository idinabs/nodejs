const list_model = require('../models/list-model')


module.exports = {

    index_table : (req, res) => {
        list_model.find((error, lists) => {

            if (error) console.log('data anda tidak bisa dirender')
            
            res.render('table-basic', {lists})
        })

    },

    index_icon : (req, res) => {
        res.render('icon-material')
    },

    create : (req, res) => {

        res.render('add')

    },

    store : (req, res) => {
        const todo = new list_model({

            name : req.body.name,
            slug : req.body.slug,
            description : req.body.description,
        })

        todo.save(function(error, data){

            if (error) console.log('data tidak bisa disimpan')
            console.log(data)

            res.redirect('/home/add')
        })


    },

    
    update : (req, res) => {

        const id = req.params.id
        list_model.findById(id, (error, data) => {
            if(error) console.log('data anda tidak bisa diedit')
            res.render('layout/user/edit', {user : data})
        })
    }
    
}