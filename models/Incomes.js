const mongoose = require('mongoose');

const { Schema } = mongoose;

const incomeSchema = new Schema({
    description: { type: String},
    value: { type: String, required: true},
    date: { type: Date, required: true},
    category: { type: String, enum: [ 'Food', 'Supermarket', 'Transportation']},
    // recurrence: { type: String, required: true},
    // picture: { type: String },
});

const Income = mongoose.model('Income', incomeSchema);

module.exports = Income;