const express = require('express');

const router = express.Router();

router.get('/signup', (req, res, next) => {
  res.render('public/signup');
});

router.get('/login', (req, res, next) => {
  res.render('public/login');
});

module.exports = router;
