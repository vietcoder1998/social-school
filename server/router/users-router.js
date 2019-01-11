const express = require('express');
const router = express.Router();
const fs = require('fs');
const pug = require('pug');

// Register
router.route('/register')
    .get((req, res) => {
        res.render('register.handlebars');
    })
    .post((req, res) => {
        res.send('ok');
    });

router.route('/logintest')
    .get((req, res) => {
        res.render('login.html');
    })
    .post((req, res) => {

    });

router.route('/testpug')
    .get((req, res)=>{
        res.render();
    })

module.exports = router;