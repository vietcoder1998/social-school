const session = require('express-session');
const cookie = require('cookie-parser');

var checkUser = function (req, res, ){
    if (req.cookies['islogin'] == false) {
        return false
    } return true;
} 

module.exports.checkUser = checkUser;