const mongoose = require('mongoose');

const { Schema } = mongoose;

const incomeSchema = new Schema({
  description: { type: String },
  value: { type: Number, required: true },
  date: { type: Date, required: true },
  category: { type: String, enum: ['Salary', 'Freelancer', 'Carry Over'], required: true },
  // recurrence: { type: String, required: true},
  // picture: { type: String },
});

const Income = mongoose.model('Income', incomeSchema);

module.exports = Income;
