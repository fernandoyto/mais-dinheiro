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

async function getBalanceArray(userId) {
  const daysArray = [];
  const valueArray = [];
  let sumOfDay; let x; let y;
  const totalBalanceInCurrentMonthArray = [];
  const recentIncomes = await Income.aggregate([
    { $addFields: { month: { $month: '$date' } } },
    // { $match: { userId: mongoose.Types.ObjectId(userId), month: currentDate.getMonth() } },
    // { $match: { userId: mongoose.Types.ObjectId(userId), month: currentMonth } },
    // { $match: { userId: mongoose.Types.ObjectId(userId), month: '$month' } },
    { $match: { userId: mongoose.Types.ObjectId(userId), month: 10 } }, // como colocar o mes sem ser chumbado????
  ]);

  recentIncomes.forEach((income, index) => {
    daysArray.push(new Date(recentIncomes[index].date).getDate());
    valueArray.push(recentIncomes[index].value);
  });

  const arrayDelete = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

  for (let i = 0; i < arrayDelete.length; i++) {
    x = i;
    sumOfDay = 0;
    for (let j = 0; j < daysArray.length; j++) {
      y = j;
      if (arrayDelete[x] === daysArray[y]) {
        sumOfDay += valueArray[j];
      }
      if (y === daysArray.length - 1 && sumOfDay !== 0) {
        totalBalanceInCurrentMonthArray.push(sumOfDay);
      }
      if (y === daysArray.length - 1 && sumOfDay == 0) {
        totalBalanceInCurrentMonthArray.push(0);
      }
    }
  }

  // console.log('back',totalBalanceInCurrentMonthArray)
  return totalBalanceInCurrentMonthArray;
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
  getBalanceArray,
  getCurrencyData
};
