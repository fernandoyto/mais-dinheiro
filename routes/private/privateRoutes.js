const express = require('express');

const Income = require('../../models/Incomes');

const router = express.Router();

router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect('/login');
  });
});

router.get('/home', (req, res, next) => {
  res.render('private/home');
});

router.post('/home/incomes/new', async (req, res, next) => {
  const { description, value, date, category } = req.body;
  const newIncome = new Income({ description, value, date, category });
  try {
    await newIncome.save();
    res.json(req.body);
  } catch (error) {
    console.log(error);
    res.json(req.body);
  }
});

module.exports = router;
