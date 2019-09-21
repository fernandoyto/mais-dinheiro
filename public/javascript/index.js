// const api = new APIHandler('http://localhost:3000');

async function getRecentIncomes() {
  try {
    const recentIncomes = await axios.get('/api/recent-incomes');
    const recentIncomesDiv = document.getElementById('recent-incomes');
    recentIncomesDiv.innerHTML = '';
    document.getElementById('recent-incomes').innerHTML = '';
    recentIncomes.data.forEach((income) => {
      recentIncomesDiv.innerHTML += `
      <li>
        Description: ${income.description} --- Value: ${income.value} --- Date: ${income.date} --- Category: ${income.category}
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
};
