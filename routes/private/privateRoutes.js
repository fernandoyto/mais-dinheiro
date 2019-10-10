const express = require('express');

const router = express.Router();

const {
  getRecentIncomes,
  getRecentExpenses,
  getAllIncomes,
  getAllExpenses,
  getSumIncomes,
  getSumExpenses,
  getExpenseArray,
  getCurrencyData
} = require('../../controlers/privateRoutes.controler');

// const {
//   getCurrencyData
// } = require('../../API/requestAPI');

const {
  formatMoney,
} = require('../../public/javascript/helperFunctions');

router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect('/login');
  });
});

router.get('/home', async (req, res) => {
  const user = req.session.currentUser
  const recentIncomes = await getRecentIncomes(user._id);
  const recentExpenses = await getRecentExpenses(user._id);
  const allIncomes = await getAllIncomes(user._id);
  const allExpenses = await getAllExpenses(user._id);
  const sumIncomes = await getSumIncomes(user._id);
  const sumExpenses = await getSumExpenses(user._id);
  const balanceArray = await getExpenseArray(user._id);
  const currencyData = await getCurrencyData();
  console.log('currency',currencyData)
  res.render('private/home', {
    user,
    recentIncomes,
    recentExpenses,
    allIncomes,
    allExpenses,
    totalIncome: sumIncomes[0].sum,
    totalExpense: sumExpenses[0].sum,
    balance: formatMoney( sumIncomes[0].sum - sumExpenses[0].sum),
    balanceArray,
    currencyData
  });
});


module.exports = router;
