module.exports.registerPage = (req, res) => {
    res.render('../sources/views/user/register/registerPage.ejs', {
        title : 'Rabuncode | Register',
    })
}