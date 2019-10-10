var incomesModal = document.getElementById("incomes-modal");
var expensesModal = document.getElementById("expenses-modal");

var incomesModalBtn = document.getElementById("incomes-modal-btn");
var expensesModalBtn = document.getElementById("expenses-modal-btn");

var span = document.getElementsByClassName("close")[0];

incomesModalBtn.onclick = function() {
  incomesModal.style.display = "block";
}

expensesModalBtn.onclick = function() {
  expensesModal.style.display = "block";
}

span.onclick = function() {
  incomesModal.style.display = "none";
  expensesModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == incomesModal) {
    incomesModal.style.display = "none";
  }
  if (event.target == expensesModal) {
    expensesModal.style.display = "none";
  }
}