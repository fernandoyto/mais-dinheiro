const express = require('express');

const router = express.Router();

const {
  getRecentIncomes,
  getRecentExpenses,
  getAllIncomes,
  getAllExpenses,
} = require('../../controlers/privateRoutes.controler');

router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect('/login');
  });
});

router.get('/home', async (req, res) => {
  const recentIncomes = await getRecentIncomes(req.session.currentUser._id);
  const recentExpenses = await getRecentExpenses(req.session.currentUser._id);
  const allIncomes = await getAllIncomes(req.session.currentUser._id);
  const allExpenses = await getAllExpenses(req.session.currentUser._id);
  res.render('private/home', {
    recentIncomes,
    recentExpenses,
    totalIncome: allIncomes[0].sum,
    totalExpense: allExpenses[0].sum,
    balance: allIncomes[0].sum - allExpenses[0].sum,
  });
});

module.exports = router;
