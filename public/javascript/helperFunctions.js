function formatDate(date) {
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}

function formatMoney(money) {
    if( money.toString().includes('.')) {
      money = parseFloat(money).toFixed(2);
    } else {
      money = money + '.00'
    }
    return money
}

module.exports = {
    formatDate,
    formatMoney
}