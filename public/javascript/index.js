// const api = new APIHandler('http://localhost:3000');
// const moment = require('moment');

async function getRecentIncomes() {
  try {
    const recentIncomes = await axios.get('/api/recent-incomes');
    const recentIncomesTableBody = document.getElementById('recent-incomes-table-body');
    recentIncomesTableBody.innerHTML = '';
    let updatedRecentIncomes = '';
    recentIncomes.data.forEach((income) => {
      // const incomeDate = moment('DD MMM YYYY');
      updatedRecentIncomes += `
      <tr>
        <td>${income.category}<td>
        <td>${income.date}</td>
        <td>${income.value}</td>
      </tr>`;
    });
    recentIncomesTableBody.innerHTML = updatedRecentIncomes;
  } catch (error) {
    alert(error);
  }
}

async function getRecentExpenses() {
  try {
    const recentExpenses = await axios.get('/api/recent-expenses');
    const recentExpensesDiv = document.getElementById('recent-expenses');
    recentExpensesDiv.innerHTML = '';
    document.getElementById('recent-expenses').innerHTML = '';
    recentExpenses.data.forEach((expense) => {
      recentExpensesDiv.innerHTML += `
      <li>
        Description: ${expense.description} --- Value: ${expense.value} --- Date: ${expense.date} --- Category: ${expense.category}
      </li>`;
    });
  } catch (error) {
    alert(error);
  }
}

async function getAllBalance() {
  try {
    const allBalance = await axios.get('/api/total-balance');
    const { data } = allBalance;
    const allBalanceDiv = document.getElementById('total-balance');
    allBalanceDiv.innerHTML = '';
    allBalanceDiv.innerHTML = `
      <div>
        Total Income: ${data.totalIncome} -- Total Expense: ${data.totalExpense} -- Total Balance: ${data.balance}
      </div>
      `;
  } catch (error) {
    alert(error)
  }
}

window.onload = () => {
  document.getElementById('income-form').onsubmit = async (event) => {
    event.preventDefault();
    const description = document.getElementById('newIncDescription').value;
    const value = document.getElementById('newIncValue').value;
    const date = document.getElementById('newIncDate').value;
    const category = document.getElementById('newIncCategory').value;
    try {
      await axios.post('/api/incomes/create', { description, value, date, category });
      await getRecentIncomes();
      await getAllBalance();
    } catch (error) {
      alert(error);
    }
  };

  document.getElementById('expense-form').onsubmit = async (event) => {
    event.preventDefault();
    const description = document.getElementById('newExpDescription').value;
    const value = document.getElementById('newExpValue').value;
    const date = document.getElementById('newExpDate').value;
    const category = document.getElementById('newExpCategory').value;
    try {
      await axios.post('/api/expenses/create', { description, value, date, category });
      await getRecentExpenses();
      await getAllBalance();
    } catch (error) {
      alert(error);
    }
  };

};
