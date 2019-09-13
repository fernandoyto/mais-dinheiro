const express = require('express');

const router = express.Router();

// BCrypt to encrypt passwords
const bcrypt         = require('bcrypt');

const saltRounds     = 10;

// User model
const User = require('../models/Users');

// Signup

router.get('/signup', (req, res, next) => {
  res.render('public/signup');
});

router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (firstName === '' || lastName === '' || email === '' || password === '') {
    res.render('public/signup', { errorMessage: 'Please fill all required fields!' });
    return;
  }

  const user = await User.findOne({ email });
  if (user) {
    res.render('public/signup', { errorMessage: 'This email is already registered!' });
    return;
  }

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  const newUser = new User({ firstName, lastName, email, password: hash });

  try {
    await newUser.save();
    res.redirect('/login');
  } catch (error) {
    console.log(error);
  }
});


//Login
router.get('/login', (req, res, next) => {
  res.render('public/login');
});

module.exports = router;
