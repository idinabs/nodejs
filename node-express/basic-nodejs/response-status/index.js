const express = require('express')
const app = express()

app.listen(3000, function(){
    console.log('Server anda sedang berjalan')
})


app.get('/user/:uid/photos/:file', function (req, res) {
    var uid = req.params.uid
    var file = req.params.file
  
    req.user.mayViewFilesFrom(uid, function (yes) {
      if (yes) {
        res.sendFile('/uploads/' + uid + '/' + file)
      } else {
        res.status(403).send("Sorry! You can't see that.")
      }
    })
  })
  