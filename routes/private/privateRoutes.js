const express = require('express');

const router = express.Router();

const Income = require('../../models/Incomes');
const Expense = require('../../models/Expenses')

router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect('/login');
  });
});

router.get('/home', async (req, res) => {
  const recentIncomes = await Income.find({ userId: req.session.currentUser._id }).sort({ date: -1 }).limit(5);
  const recentExpenses = await Expense.find({ userId: req.session.currentUser._id }).sort({ date: -1 }).limit(5);
  res.render('private/home', { recentIncomes, recentExpenses });

});

module.exports = router;
