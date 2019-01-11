const express = require('express');
const router = express.Router();
const autho = require('../base/autho');
const session = require('express-session');
// Get HomePage


router.route('/')
    .get((req, res) => {
        res.cookie('islogin', false);
        var context = { title: "My New Post", body: "This is my first post!" };
        res.render('layouts', context);
    });

router.route('/index')
    .get((req, res) => {
        if (autho.checkUser == true ) {
            res.redirect('/login');
        } else {
            res.render('index');
        }
        console.log(req.cookies['islogin']);
    
    })
    .post((req, res) => {
    })

router.route('/test')
    .get(autho.checkUser, (req, res) => {
        res.render('test');
    });


module.exports = router;