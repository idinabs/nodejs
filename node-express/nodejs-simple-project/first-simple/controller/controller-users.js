const { nanoid } = require('nanoid')



let users = [
    { id : 1, name : 'Eryanto', email : 'eryanto15@gmail.com' },
    { id : 2, name : 'Opik', email : 'shofiyurrahmasauqi07@gmail.com' },

];


module.exports= {

    index : function(req, res){
        res.render('index', {users})
    },
    
    show : function(req, res){

        const id = req.params.id
        const data = users.filter(user => {

            return user.id == id
        })

        res.render('show/show', {user : data})
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

        users.push({
            id : nanoid(),
            name : req.body.name,
            email : req.body.email,
        })
        console.log(users)
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
