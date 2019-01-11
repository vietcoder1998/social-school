const express = require("express");
const login = require("./server/router/login-router");
const app = express();
const http = require('http');
const reload = require('reload');
const cookieParse = require('cookie-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const index = require('./server/router/index');
const users = require('./server/router/users-router');
const passport = require('passport');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const path = require('path');
const flash = require('flash');
const csld = require('consolidate');
const mustache = require('mustache');
const ejs = require('ejs');
const mongoose = require('mongoose');
const db = require('./server/model/js/keys');

// Create and set port for server

const server = http.createServer(app);
app.set(`trust proxy`, 1);


// Set View Engine
// app.set('views', path.join(__dirname, 'views'));
app.set('views', path.join(__dirname + '/client/views/layouts'));
app.engine('html', csld.mustache);
app.engine('hbs', hbs({ defaultLayout: '', extname: 'hbs'}));
app.set('view engine','hbs');

// Db Connect
mongoose.connect(db.dbURI, {useNewUrlParser: true})
.then(()=> {
    console.log('mongodb connected');
})
.catch(err => console.log(err));

// BodyParser MiddleWare
app.use(cookieParse());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport init
app.use(passport.initialize());

// Set Static Folder
app.use(express.static(path.join(__dirname, '/client/public')));

// Express session
app.use(session({
    secret: 'uetchat',
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: true,
        expires: 10000
    }
}));

// Express Validator
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespage.length) {
            formParam += '[' + namespace.shift() + ']';
        }

        return {
            param: formParam,
            msg: msg,
            value: value
        }
    }
}));

//  Connect Flash
app.use(flash());

app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// index
// app.use('/',router);
app.use('/user', users);
app.use(login);
app.use(index);
// Run server
app.set('port', process.env.PORT || 4000);

server.listen(app.get('port'), () => {
    console.log(`server running in: ` + app.get('port'));
});