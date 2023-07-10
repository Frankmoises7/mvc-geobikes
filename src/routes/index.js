const router = require('express').Router();
const express = require('express');
const passport = require('passport');
const bodyparser = require('body-parser');
const ShortUrl = require('../models/shortUrl')
const ensureAuthenticated = require('../middleware/ensureAuthenticated')

const path = require('path')

const app = express();


/* app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname + '/public'))); */


// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

router.get('/', (req, res) => {
  res.render('home')
})

router.get('/home', ensureAuthenticated, async (req, res) => {
  res.render('home')
})

router.get('/register', (req, res, next) => {
  res.render('register');
});

router.post('/register', passport.authenticate('local-signup', {
  successRedirect: '/home',
  failureRedirect: '/register',
  failureFlash: true
})); 

router.get('/login', (req, res, next) => {
  res.render('login', { message: req.flash('error_msg') });
});


router.post('/login', passport.authenticate('local-signin', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: true,
}));

router.get('/home',ensureAuthenticated, (req, res, next) => {
  res.render('home');
});

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.post('/shortUrls', async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl })
  res.redirect('/home')
})

router.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
  if (shortUrl == null) return res.render('404')
  shortUrl.clicks++
  shortUrl.save()

  res.redirect(shortUrl.full)
})

router.get('*', (req, res) => {
  res.render('404')
})


module.exports = router;
