const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
    userId: { type: String, required: true, trim: false },
    publicacionId: { type: String, required: true, trim: false },
    comentario: { type: String, required: true, trim: true },
    valoracion: { type: Number, required: true, trim: false },
}, { timestamps: true });

module.exports = mongoose.model('Comentario', comentarioSchema);