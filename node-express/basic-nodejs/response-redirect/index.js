const express =  require('express')
const app = express()


app.listen(4000, function(){
    console.log('server sedang berjalan')
})

app.get('/', function(req, res){

    
    res.json
    (
        {
            id : '1',
            status : 'Data Covid Nusa Tenggara Barat',
            kasus : '11.073',
            pria : '5.475',
            wanita : '5.608',
        },

    )
})


app.get('/about', function(req, res){
    res.send('This is About page');
})

app.get('/user', function(req, res){

    res.redirect('/')
})