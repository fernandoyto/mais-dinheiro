const currentDate = new Date();
const totalDaysInCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
const totalDaysInCurrentMonthArray = [];
const monthNamesArray = [
  'January', 'February', 'March',
  'April', 'May', 'June',
  'July', 'August', 'September',
  'October', 'November', 'December',
];

// COULDNT IMPORT balanceArrayToChart TOFIX
// var privateRoutes = require('../../routes/private/privateRoutes');


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

let oi = [];

function teste (obj) {
  oi = obj.split(',').map((item) => {
    return parseInt(item, 10);
  });
}
teste(chartValue);
console.log(oi);
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
      label: `Balance of ${getMonthName(currentDate)}`,
      backgroundColor: '#ffaa00',
      borderColor: '#ffaa00',
      data: oi,
    }],
  },

  // Configuration options go here
  options: {},
});
