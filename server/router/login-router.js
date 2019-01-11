const express = require('express');
const router = express.Router();
const session = require('express-session');
const bodyParse = require('body-parser');
const fs = require('fs');
const validate = require('../base/validate');
const autho = require('../base/autho');
const cookieParser = require('cookie-parser');

router.use(express.static("./client/views"));
router.use(bodyParse.urlencoded({
    extended: true
}));

router.use(cookieParser());

router.use(session({
    secret: 'uetchat',
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: true,
        expires: 10000
    }
}));


// Login and check passport
router.route('/login')
    .get( (req, res) => {
        res.render('login');  
    })
    .post(validate.loginValidate, (req, res) => {
        req.redirect('/index');
    });
// Trick

router.route('/loginFalse')
    .get((req, res) => {
        res.redirect('/login');
    });

router.route('/loginOk').get((req, res) => {
    res.redirect('/index');
})

module.exports = router;