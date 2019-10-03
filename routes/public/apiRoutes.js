const express = require('express');

const Income = require('../../models/Incomes');
const Expense = require('../../models/Expenses');

const router = express.Router();

router.post('/api/incomes/create', async (req, res) => {
  const { description, value, date, category } = req.body;
  const userId = req.session.currentUser._id;
  const newIncome = new Income({ description, value, date, category, userId });
  try {
    await newIncome.save();
    res.json(newIncome);
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
    res.json(newExpense);
  } catch (error) {
    console.log(error);
  }
});


router.get('/api/recent-expenses', async (req, res) => {
  const recentExpenses = await Expense.find({ userId: req.session.currentUser._id }).sort({ date: -1}).limit(5);
  res.json(recentExpenses); 
});

router.get('/api/all-incomes', async (req, res) => {
  // const currentId = req.session.currentUser._id
  const allIncomes = await Income.find({ userId: req.session.currentUser._id}).sort({ date: -1 });
  let sumIncomes = 0;
  if (allIncomes.length === 1) {
    sumIncomes = allIncomes[0].value;
  } else if (allIncomes === 0) {
    sumIncomes = 0;
  } else {
    sumIncomes = allIncomes.reduce((a, b) => ({ value: a.value + b.value })).value;
  }
  // console.log(currentId);
  // const allIncomes = await Income.aggregate([
  //   { $match: { userId: currentId } },
  //   { $group: { _id: null, sum: { $sum: '$value' } } }
  // ]);
  const allExpenses = await Expense.find({ userId: req.session.currentUser._id}).sort({ date: -1 });
  let sumExpenses = 0;
  if (allExpenses.length === 1) {
    sumExpenses = allExpenses[0].value;
  } else if (allExpenses.length === 0) {
    sumExpenses = 0;
  } else {
    sumExpenses = allExpenses.reduce((a, b) => ({ value: a.value + b.value })).value;
  }
  res.json({ sumIncomes, sumExpenses, balance: sumIncomes - sumExpenses });
});

module.exports = router;
