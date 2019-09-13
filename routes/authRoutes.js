const express = require('express');

const router = express.Router();

// User model
const User = require("../models/Users");

// BCrypt to encrypt passwords
const bcrypt         = require("bcrypt");
const saltRounds     = 10;

// Signup
router.get('/signup', async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (name === '' || email === '' || password === '') {
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
  const newUser = new User({ name, email, password: hash });

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
