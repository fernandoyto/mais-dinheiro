const express = require('express');
const mongoose = require('mongoose');

const Income = require('../../models/Incomes');
const Expense = require('../../models/Expenses');

const router = express.Router();

router.post('/api/incomes/create', async (req, res) => {
  const { description, value, date, category } = req.body;
  const userId = req.session.currentUser._id;
  const newIncome = new Income({ description, value, date, category, userId });
  try {
    await newIncome.save();
    res.redirect('/home');
  } catch (error) {
    console.log(error);
  }
});

router.get('/api/recent-incomes', async (req, res) => {
  const recentIncomes = await Income.find({ userId: req.session.currentUser._id }).sort({ date: -1 }).limit(5);
  res.json(recentIncomes);
});

router.post('/api/expenses/create', async (req, res) => {
  const {description, value, date, category } = req.body;
  const userId = req.session.currentUser._id;
  const newExpense = new Expense({ description, value, date, category, userId });
  try {
    await newExpense.save();
    res.redirect('/home');
  } catch (error) {
    console.log(error);
  }
});


router.get('/api/recent-expenses', async (req, res) => {
  const recentExpenses = await Expense.find({ userId: req.session.currentUser._id }).sort({ date: -1}).limit(5);
  res.json(recentExpenses); 
});

router.get('/api/total-balance', async (req, res) => {
  const allIncomes = await Income.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(req.session.currentUser._id) } },
    { $group: { _id: req.session.currentUser._id, sum: { $sum: '$value' } } }
  ]);
  const allExpenses = await Expense.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(req.session.currentUser._id) } },
    { $group: { _id: req.session.currentUser._id, sum: { $sum: '$value' } } }
  ]);
  res.json({ totalIncome: allIncomes[0].sum, totalExpense: allExpenses[0].sum, balance: allIncomes[0].sum - allExpenses[0].sum });
});

module.exports = router;
