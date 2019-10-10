function dayOf(date) {
  return (JSON.stringify(new Date (date))).split('T')[0].substring(9,11);
}

function mesOf(date) {
  return (JSON.stringify(new Date (date))).split('T')[0].substring(6,8);
}

function yearOf(date) {
  return (JSON.stringify(new Date (date))).split('T')[0].substring(1,5);
}

function formatDate(date) {
    return `${dayOf(date)}/${mesOf(date)}/${yearOf(date)}`;
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
