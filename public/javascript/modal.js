// Get the modal
var incomesModal = document.getElementById("incomes-modal");
var expensesModal = document.getElementById("expenses-modal");

// Get the button that opens the modal
var incomesModalBtn = document.getElementById("incomes-modal-btn");
var expensesModalBtn = document.getElementById("expenses-modal-btn");


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
incomesModalBtn.onclick = function() {
    incomesModal.style.display = "block";
}

expensesModalBtn.onclick = function() {
    expensesModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
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