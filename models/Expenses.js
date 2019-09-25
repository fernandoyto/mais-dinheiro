const mongoose = require('mongoose');

const { Schema } = mongoose;

const expenseSchema = new Schema({
  description: { type: String },
  value: { type: Number, required: true },
  date: { type: Date, required: true },
  category: { type: String, enum: ['Food', 'Supermarket', 'Transportation', 'Entertainment'] },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  creationDate: { type: Date},
  // recurrence: { type: String, required: true},
  // picture: { type: String },
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
