const express = require('express');
const path = require('path');
const hbs = require('hbs');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const authController = require('./controllers/authController');
const homeController = require('./controllers/homeController');

// Inicializaciones
const app = express();
app.use(express.static(path.join(__dirname, '/public')));

// Configuración de las vistas
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

// Configuración de la sesión
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));
app.use(flash());

// Inicializamos Passport y la sesión
app.use(passport.initialize());
app.use(passport.session());


// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('BD CONECTADA');
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
  });


// Rutas de controladores
app.use('/', authController);
app.use('/', homeController);



// Iniciar el servidor
app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor en ejecución en el puerto', process.env.PORT || 3000);
});
