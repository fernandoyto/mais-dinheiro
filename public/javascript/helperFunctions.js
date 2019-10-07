function formatDate(date) {
    return `${date.getDate() + 1}/${date.getMonth() + 1}/${date.getFullYear()}`;
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