const mongoose = require('mongoose');
const Income = require('../models/Incomes');
const Expense = require('../models/Expenses');

function formatDate(date){
  return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()

}

async function getRecentIncomes(userId) {
  let recentIncomes = await Income.find({ userId }).sort({ date: -1 }).limit(5);
  recentIncomes.forEach((income, index) => {
   recentIncomes[index]['formattedDate'] = formatDate( new Date(recentIncomes[index].date));
  });
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

  if (allIncomes.length !== 0) {
    return allIncomes;
  } else {
    return [
      { sum : 0}
    ]
  }
}

async function getAllExpenses(userId) {
  const allExpenses = await Expense.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(userId) } },
    { $group: { _id: userId, sum: { $sum: '$value' } } },
  ]);
  if (allExpenses.length !== 0) {
    return allExpenses;
  } else {
    return [
      { sum : 0}
    ]
  }
}

module.exports = {
  getRecentIncomes,
  getRecentExpenses,
  getAllIncomes,
  getAllExpenses,
};
