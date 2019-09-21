// const api = new APIHandler('http://localhost:3000');

window.onload = () => {
  document.getElementById('income-form').onsubmit = async (event) => {
    event.preventDefault();
    const description = document.getElementById('newIncDescription').value;
    const value = document.getElementById('newIncValue').value;
    const date = document.getElementById('newIncDate').value;
    const category = document.getElementById('newIncCategory').value;
    await axios.post('/api/incomes/create', { description, value, date, category });
  };
};
