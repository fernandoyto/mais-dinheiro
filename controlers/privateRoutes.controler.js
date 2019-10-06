const mongoose = require('mongoose');
const Income = require('../models/Incomes');
const Expense = require('../models/Expenses');

const {
  formatDate,
  formatMoney
} = require('../public/javascript/helperFunctions');

async function getRecentIncomes(userId) {
  const recentIncomes = await Income.find({ userId }).sort({ date: -1 }).limit(5);
  recentIncomes.forEach((income, index) => {
    recentIncomes[index].formattedDate = formatDate(new Date(recentIncomes[index].date));
    recentIncomes[index].formattedValue = formatMoney(recentIncomes[index].value);
  });
  return recentIncomes;
}

async function getRecentExpenses(userId) {
  const recentExpenses = await Expense.find({ userId }).sort({ date: -1 }).limit(5);
  recentExpenses.forEach((income, index) => {
    recentExpenses[index].formattedDate = formatDate(new Date(recentExpenses[index].date));
    recentExpenses[index].formattedValue = formatMoney(recentExpenses[index].value);
  });
  return recentExpenses;
}

async function getAllIncomes(userId) {
  const allIncomes = await Income.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(userId) } },
    { $group: { _id: userId, sum: { $sum: '$value' } } },
  ]);

  if (allIncomes.length !== 0) {
    return allIncomes;
  }
  return [{ sum: 0 }];
}

async function getAllExpenses(userId) {
  const allExpenses = await Expense.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(userId) } },
    { $group: { _id: userId, sum: { $sum: '$value' } } },
  ]);
  
  if (allExpenses.length !== 0) {
    return allExpenses;
  }
  return [{ sum: 0 }];
}

module.exports = {
  getRecentIncomes,
  getRecentExpenses,
  getAllIncomes,
  getAllExpenses,
};
