const express = require('express')
const app = express.Router()


let users = [
    {id: 1, name: 'Shofiurrahman Sauqi'},
    {id: 2, name: 'Eryanto'},
    {id: 3, name: 'Abubakar Sidik'}
]

app.route('/user')

    // read data users
    .get(function (req, res){
        res.json(users)
    })

    // create data users
    .post(function (request, response){
        users.push(request.body)
        response.send(users)
    })

app.route('/user/:id')

    // update data users
    .put(function (req, res){
    
        const id = req.params.id
        users.filter(user => {
            if(user.id == id){
                user.id = id
                user.name = req.body.name

                return(user);
            }
        
        })

    res.json(users)
    
    })

    // delete data users
    .delete(function (req, res){

        let id = req.params.id
        users = users.filter( user => user.id != id)
        res.send(users)
        
    })


module.exports = app;
