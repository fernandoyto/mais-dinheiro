const mongoose = require('mongoose');

const { Schema } = mongoose;

const expenseSchema = new Schema({
    description: { type: String},
    value: { type: String, required: true},
    date: { type: Date, required: true},
    category: { type: String, enum: [ 'Food', 'Supermarket', 'Transportation', 'Entertainment']},
    // recurrence: { type: String, required: true},
    // picture: { type: String },
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;