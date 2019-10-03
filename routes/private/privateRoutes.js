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
  // const allIncomes = await Income.find({ userId: req.session.currentUser._id}).sort({ date: -1 });
  // const allExpenses = await Expense.find({ userId: req.session.currentUser._id}).sort({ date: -1 });

  // let sumIncomes = 0;
  // if (allIncomes.length === 1) {
  //   sumIncomes = allIncomes[0].value;
  // } else if (allIncomes === 0) {
  //   sumIncomes = 0;
  // } else {
  //   sumIncomes = allIncomes.reduce((a, b) => ({ value: a.value + b.value })).value;
  // }
 
  // let sumExpenses = 0;
  // if (allExpenses.length === 1) {
  //   sumExpenses = allExpenses[0].value;
  // } else if (allExpenses.length === 0) {
  //   sumExpenses = 0;
  // } else {
  //   sumExpenses = allExpenses.reduce((a, b) => ({ value: a.value + b.value })).value;
  // }

  res.render('private/home', { recentIncomes, recentExpenses, sumIncomes, sumExpenses,  balance: sumIncomes - sumExpenses });

});

module.exports = router;
