const list = require('../models/list-model')
const list_model = require('../models/list-model')
const logout = require('express-passport-logout')
const express = require('express')

const app = express()
const cookieParser = require('cookie-parser')

app.use(cookieParser)

module.exports = {

    index_table : async (req, res, next) => {
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
    },


    edit : (req, res) => {

        let upd = {}
        
        upd.name = req.body.name,
        upd.slug = req.body.slug,
        upd.description = req.body.description,

        query = {_id: req.params.id}

        list_model.update(query, upd, (error) => {

            if(error) {
                console.log('data anda tidak bisa diinput');
                return;
            }else {
                res.redirect('/')
            }

        })
    },

    destroy : (req, res) => {

        console.log(req.params.id)
        let id = req.params.id
        list_model.remove({_id: id}, (err) => {
            if(err)
                console.log('data tidak bisa dihapus')

            else
                res.redirect('/')

        })
    },

}