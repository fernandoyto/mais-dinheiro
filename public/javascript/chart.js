let currentDate = new Date();
let totalDaysInCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
let totalDaysInCurrentMonthArray = [];
let monthNamesArray = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
];

// COULDNT IMPORT balanceArrayToChart TOFIX
// var privateRoutes = require('../../routes/private/privateRoutes');


function calculateDaysInCurrentMonthArray() {
    let count = 1;
    for( let i=0; i<totalDaysInCurrentMonth; i++) {
        totalDaysInCurrentMonthArray.push(count)
        count ++;
    }
    return totalDaysInCurrentMonthArray
}

function getMonthName(month) {
    return monthNamesArray[month.getMonth()];
};

let oi;

function teste(obj){
    oi = obj.split(',').map(function(item) {
        return parseInt(item,10)
    })

    console.log(oi)
    console.log( totalDaysInCurrentMonthArray)
    console.log(typeof oi, typeof totalDaysInCurrentMonthArray)
}

calculateDaysInCurrentMonthArray()

// ---------------------------------- START THE LOGIC TO CREATE THE CHART -----------------
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: totalDaysInCurrentMonthArray,
        datasets: [{
            label: 'Balance of ' + getMonthName(currentDate),
            backgroundColor: '#ffaa00',
            borderColor: 'ffaa00',
            data: [0, 0, 0, 1234, 246, 4576, -300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 123, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 123, 0]
        }]
    },

    // Configuration options go here
    options: {}
});