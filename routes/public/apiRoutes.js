const express = require('express');

const Income = require('../../models/Incomes');

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

module.exports = router;
