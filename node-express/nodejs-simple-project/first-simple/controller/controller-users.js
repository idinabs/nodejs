const { nanoid } = require('nanoid')

// parsing user model from model
const user_model = require('../model/user-model')


//  statis data
// let users = [
//     { id : 1, name : 'Eryanto', email : 'eryanto15@gmail.com' },
//     { id : 2, name : 'Opik', email : 'shofiyurrahmasauqi07@gmail.com' },

// ];


module.exports= {

    index : function(req, res){

        let keyword = {}
        
        if(req.query.keyword) {
          keyword = {name : {$regex: req.query.keyword}}
        }

        user_model.find(keyword, "name _id" ,function(error, users){

            if (error) console.log('data anda tidak bisa di tampilkan')

            console.log('data anda ditampilkan')

            res.render('index', {users})


        })
        
        // show all user from db mongo
        // user_model.find(function(error, users){

        //     if (error) console.log('data anda tidak bisa di tampilkan')

        //     console.log('data anda ditampilkan')

        //     res.render('index', {users})


        // })


        // render template with static data
        // res.render('index', {users})
    },
    
    show : function(req, res){



        const id = req.params.id
        user_model.findById(id, function(error, data){

            if (error) console.log('data anda tidak bisa ditampilkan')
            console.log(data)

            res.render('show/show', {user : data})

        })
        

        // show data using statis data user
        // const id = req.params.id
        // const data = users.filter(user => {

        //     return user.id == id
        // })

        // res.render('show/show', {user : data})
    },


    home : function(req, res){
        if (users.length > 0){
            res.json({ 
                status : true,
                data : users,
                method : req.method,
                url : req.url,
             })
        }else {
            res.json({ 
                status : false,
                message : 'maaf data anda tidak ada'
            })
        }
    },

    create : function(req, res){



        const users = new user_model({

            name : req.body.name,
            email : req.body.email,
        })

        users.save(function(error, data){

            if (error) console.log('data anda tidak bisa disimpan')
            console.log(data)
        })

        
        // push data with statis data
        // users.push({
        //     id : nanoid(),
        //     name : req.body.name,
        //     email : req.body.email,
        // })
        // console.log(users)
        res.redirect('/')

    },


   update : function(req, res){
    
        const id = req.params.id
        user = users.filter( user => {

                if (user.id == id){
                    user.id = id
                    user.name = req.body.name
                    user.email = req.body.email
                }

                return(user)
            })

        res.json(user)
   },

   delete : function(req, res){

        let id = req.params.id
        const user = users.filter( user => user.id != id )

        res.json({

            status : true,
            data : user,
            message : 'data anda telah dihapus', 
            method : req.method,
            url : req.url,
        })
    }



    
}
