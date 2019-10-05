// const api = new APIHandler('http://localhost:3000');
// const moment = require('moment');

async function getRecentIncomes() {
  try {
    const recentIncomes = await axios.get('/api/recent-incomes');
    const recentIncomesTableBody = document.getElementById('recent-incomes-table-body');
    recentIncomesTableBody.innerHTML = '';
    let updatedRecentIncomes = '';
    recentIncomes.data.forEach((income) => {
      updatedRecentIncomes += `
      <tr>
        <td>${income.category}<td>
        <td>${income.date.getFullYear()}</td>
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
    const recentExpensesDiv = document.getElementById('recent-expenses-table-body');
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
    } catch (error) {
      alert(error);
    }
  };
};
