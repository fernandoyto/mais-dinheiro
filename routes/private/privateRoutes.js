const express = require('express');

const router = express.Router();

router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect('/login');
  });
});

router.get('/home', (req, res, next) => {
  res.render('private/home');
});

module.exports = router;
