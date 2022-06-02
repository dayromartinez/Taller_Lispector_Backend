
const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    test: { type: String, required: true, trim: true }
})

module.exports = mongoose.model('Test', testSchema);