const express = require('express');

const router = express.Router();

// BCrypt to encrypt passwords
const bcrypt         = require('bcrypt');

const saltRounds     = 10;

// User model
const User = require('../../models/Users');

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

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  if (email === '' || password === '') {
    res.render('public/login', {
      errorMessage: 'Please enter both, username and password to sign up.',
    });
    return;
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.render('public/login', { errorMessage: "The username doesn't exist." });
    return;
  }

  if (bcrypt.compareSync(password, user.password)) {
    req.session.currentUser = user;
    res.redirect('/home');
  } else {
    res.render('public/login', { errorMessage: 'Incorrect password' });
  }
});

module.exports = router;
