const express = require('express');
const mongoose = require('mongoose');

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
  const allIncomes = await Income.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(req.session.currentUser._id) } },
    { $group: { _id: req.session.currentUser._id, sum: { $sum: '$value' } } }
  ]);
  const allExpenses = await Expense.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(req.session.currentUser._id) } },
    { $group: { _id: req.session.currentUser._id, sum: { $sum: '$value' } } }
  ]);
  res.render('private/home', {
    recentIncomes,
    recentExpenses,
    totalIncome: allIncomes[0].sum,
    totalExpense: allExpenses[0].sum,
    balance: allIncomes[0].sum - allExpenses[0].sum,
  });
});

module.exports = router;
