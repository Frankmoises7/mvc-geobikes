const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('home');
});

router.get('/login', (req, res, next) => {
  res.render('login', { message: req.flash('error_msg') });
});

router.get("/register", function(req, res) {
  res.render("register");
});

router.get('*', (req, res) => {
  res.render('404');
});

module.exports = router;
