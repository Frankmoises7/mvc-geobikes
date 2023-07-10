const express = require('express');
const path = require('path');
const hbs = require('hbs')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const ShortUrl = require('./models/shortUrl')

// initializations
const app = express();
require('./database');
require('./passport/local-auth');
app.use(express.static(path.join(__dirname + '/public')));

// settings
app.set('port', process.env.PORT || 3000);
hbs.registerPartials(path.join(__dirname, 'views', 'partials'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
  secret: 'mysecretsession',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  app.locals.signinMessage = req.flash('signinMessage');
  app.locals.signupMessage = req.flash('signupMessage');
  app.locals.user = req.user;
  next();
});

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// routes
app.use('/', require('./routes/index'));

// Starting the server
app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
});
