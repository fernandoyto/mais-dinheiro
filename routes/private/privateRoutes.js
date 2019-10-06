const express = require('express');

const router = express.Router();

const {
  getRecentIncomes,
  getRecentExpenses,
  getAllIncomes,
  getAllExpenses,
} = require('../../controlers/privateRoutes.controler');

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
  res.render('private/home', {
    user,
    recentIncomes,
    recentExpenses,
    totalIncome: allIncomes[0].sum,
    totalExpense: allExpenses[0].sum,
    balance: formatMoney( allIncomes[0].sum - allExpenses[0].sum),
  });
});

module.exports = router;
