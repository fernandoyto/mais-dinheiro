const mongoose = require('mongoose');
const Income = require('../models/Incomes');
const Expense = require('../models/Expenses');
const request = require('request');

const {
  formatDate,
  formatMoney,
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

async function getExpenseArray(userId) {
  const expenseDaysArray = [];
  const expenseValueArray = [];
  let sumOfDay; let x; let y;
  const totalExpenseInCurrentMonthArray = [];
  const currentDate = new Date();
  const totalDaysInCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const totalDaysInCurrentMonthArray = [];

  const recentExpensesCurrentMonth = await Income.aggregate([
    { $addFields: { month: { $month: '$date' } } },
    // { $match: { userId: mongoose.Types.ObjectId(userId), month: currentDate.getMonth() } },
    // { $match: { userId: mongoose.Types.ObjectId(userId), month: currentMonth } },
    // { $match: { userId: mongoose.Types.ObjectId(userId), month: '$month' } },
    { $match: { userId: mongoose.Types.ObjectId(userId), month: 10 } }, // como colocar o mes sem ser chumbado????
  ]);

  // console.log('recent',recentIncomesCurrentMonth)

  recentExpensesCurrentMonth.forEach((income, index) => {
    expenseDaysArray.push(JSON.stringify(new Date(recentExpensesCurrentMonth[index].date)).split('T')[0].substring(9,11));
    expenseValueArray.push(recentExpensesCurrentMonth[index].value);
  });


  function calculateDaysInCurrentMonthArray() {
    let count = 1;
    for (let i = 0; i < totalDaysInCurrentMonth; i++) {
      totalDaysInCurrentMonthArray.push(count);
      count++;
    }
    return totalDaysInCurrentMonthArray;
  }

  calculateDaysInCurrentMonthArray();
  
  for (let i = 0; i < totalDaysInCurrentMonthArray.length; i++) {
    x = i;
    sumOfDay = 0;
    for (let j = 0; j < expenseDaysArray.length; j++) {
      y = j;
      if (totalDaysInCurrentMonthArray[x] === Number(expenseDaysArray[y])) {
        sumOfDay += expenseValueArray[j];
      }
      if (y === expenseDaysArray.length - 1 && sumOfDay !== 0) {
        totalExpenseInCurrentMonthArray.push(sumOfDay);
      }
      if (y === expenseDaysArray.length - 1 && sumOfDay == 0) {
        totalExpenseInCurrentMonthArray.push(0);
      }
    }
  }

  return totalExpenseInCurrentMonthArray;
}


async function getCurrencyData(){
  request('https://economia.awesomeapi.com.br/all/USD-BRL,EUR-BRL,BTC-chamar', function (error, response, body) {
      const dolarValueHigh = JSON.parse(body).USD.high;
      const dolarValueLow = JSON.parse(body).USD.low;
      const euroValueHigh = JSON.parse(body).EUR.high;
      const euroValueLow = JSON.parse(body).EUR.low;
      const BTCValueHigh = JSON.parse(body).BTC.high;
      const BTCValueLow = JSON.parse(body).BTC.low;
      const data = { 
        dolarValueHigh: dolarValueHigh, 
        dolarValueLow: dolarValueLow
      };
      return data;
  });
}

module.exports = {
  getRecentIncomes,
  getRecentExpenses,
  getAllIncomes,
  getAllExpenses,
  getExpenseArray,
  getCurrencyData
};
