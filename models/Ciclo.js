const mongoose = require('mongoose');

const cicloSchema = new mongoose.Schema({
    titulo: { type: String, required: true, trim: true },
    descripcion: { type: String, required: true, trim: true },
    sesiones: { type: Array, required: false, trim: false },
}, { timestamps: true });

module.exports = mongoose.model('Ciclo', cicloSchema);
