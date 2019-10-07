let currentDate = new Date();
let totalDaysInCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
let totalDaysInCurrentMonthArray = [];
let monthNamesArray = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
];

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
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
        }]
    },

    // Configuration options go here
    options: {}
});