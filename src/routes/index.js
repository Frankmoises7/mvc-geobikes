require('dotenv').config();
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const router = express.Router();
const User = require('../models/user')

const app = express();

app.use(passport.initialize());
app.use(passport.session());

// <--------------------- USUARIOS ------------------------>

passport.use(User.createStrategy());

// <--------------- Serializar - Deserializar ------------->

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

// <--------------- Serializar - Deserializar ------------->

// <--------------- configuracion de google ------------->

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://mvc-geobikes.onrender.com/auth/google/mapa"
    },
    function(accessToken, refreshToken, profile, cb) {
      console.log(profile);
      User.findOrCreate(
        { id: profile.id },
        { name: profile.displayName, email: profile.emails[0].value, idAdmin: false },
        function(err, user) {
          return cb(err, user);
        }
      );
    }
  )
);

// <--------------- configuracion de google ------------->

router.get('/', (req, res, next) => {
  res.render('home');
});

router.get('/login', (req, res, next) => {
  res.render('login', { message: req.flash('error_msg') });
});

router.get("/register", function(req, res) {
  res.render("register");
});

// Auth google
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback
router.get(
  '/auth/google/mapa',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    const isAuthenticated = req.isAuthenticated();
    res.render('mapa', { isAuthenticated });
  }
);

router.get('*', (req, res) => {
  res.render('404');
});

module.exports = router;
