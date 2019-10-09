const currentDate = new Date();
const totalDaysInCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
const totalDaysInCurrentMonthArray = [];
const monthNamesArray = [
  'January', 'February', 'March',
  'April', 'May', 'June',
  'July', 'August', 'September',
  'October', 'November', 'December',
];
let totalExpensesInCurrentMonthArray = [];

totalExpensesInCurrentMonthArray = chartValue.split(',').map((item) => {
    return parseInt(item, 10);
});

function calculateDaysInCurrentMonthArray() {
  let count = 1;
  for (let i = 0; i < totalDaysInCurrentMonth; i++) {
    totalDaysInCurrentMonthArray.push(count);
    count++;
  }
  return totalDaysInCurrentMonthArray;
}

function getMonthName(month) {
  return monthNamesArray[month.getMonth()];
}


calculateDaysInCurrentMonthArray();

// ---------------------------------- START THE LOGIC TO CREATE THE CHART -----------------
let ctx = document.getElementById('myChart').getContext('2d');
let chart = new Chart(ctx, {
  // The type of chart we want to create
  type: 'bar',

  // The data for our dataset
  data: {
    labels: totalDaysInCurrentMonthArray,
    datasets: [{
      label: `Expenses of ${getMonthName(currentDate)}`,
      backgroundColor: '#ffaa00',
      borderColor: '#ffaa00',
      data: totalExpensesInCurrentMonthArray,
    }],
  },

  // Configuration options go here
  options: {},
});
