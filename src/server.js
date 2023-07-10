const express = require('express');
const path = require('path');
const hbs = require('hbs')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const mongoose = require('mongoose')
require('dotenv').config();

// initializations
const app = express();
app.use(express.static(path.join(__dirname + '/public')));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));


// settings
app.set('port', process.env.PORT || 3000);
hbs.registerPartials(path.join(__dirname, 'views', 'partials'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));


//Configuracion de la session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUnitialized: true,
}))
app.use(flash());

// inicializamos passport y sesión.
app.use(passport.initialize());
app.use(passport.session());

//CONEXION A MONGO
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true},
  console.log("BD CONECTADA"));
// solicitudes /////////////////////////////////


// routes
app.use('/', require('./routes/index'));

// Starting the server
app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
});
