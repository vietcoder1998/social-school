const session = require('express-session');
const cookie = require('cookie-parser');

var loginValidate = function (req, res) {
    const user = {
        id: 'id',
        username: 'user1',
        password: 'pwd1'
    }

    req.session.username = req.body.username;
    req.session.password = req.body.password;

    const userSession = req.session.username;
    const passwordSession = req.session.password;

    console.log('userSesson:' + userSession +' ' + 'passwordSession: ', passwordSession);

    if (userSession == user.username && passwordSession == user.password) {
        console.log('yes');
        res.cookie('usn', req.session.username);
        res.cookie('pwd', req.session.password);
        res.cookie('islogin', true);
        res.redirect('/index');
    } else {
        res.cookie('islogin', false);
        res.redirect('/loginFalse');
    }

}

module.exports.loginValidate = loginValidate;


