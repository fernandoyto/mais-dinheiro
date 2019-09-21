const express = require('express');

const router = express.Router();

const Income = require('../../models/Incomes');

router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect('/login');
  });
});

router.get('/home', async (req, res) => {
  const recentIncomes = await Income.find({ userId: req.session.currentUser._id }).sort({ date: -1 }).limit(5);
  res.render('private/home', { recentIncomes });
});

module.exports = router;
