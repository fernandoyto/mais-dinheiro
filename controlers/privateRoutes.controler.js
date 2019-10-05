const mongoose = require('mongoose');
const Income = require('../models/Incomes');
const Expense = require('../models/Expenses');

async function getRecentIncomes(userId) {
  const recentIncomes = await Income.find({ userId }).sort({ date: -1 }).limit(5);
  return recentIncomes;
}

async function getRecentExpenses(userId) {
  const recentExpenses = await Expense.find({ userId }).sort({ date: -1 }).limit(5);
  return recentExpenses;
}

async function getAllIncomes(userId) {
  const allIncomes = await Income.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(userId) } },
    { $group: { _id: userId, sum: { $sum: '$value' } } },
  ]);
  return allIncomes;
}

async function getAllExpenses(userId) {
  const allExpenses = await Expense.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(userId) } },
    { $group: { _id: userId, sum: { $sum: '$value' } } },
  ]);
  return allExpenses;
}

module.exports = {
  getRecentIncomes,
  getRecentExpenses,
  getAllIncomes,
  getAllExpenses,
};
