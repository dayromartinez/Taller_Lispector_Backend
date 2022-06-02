const mongoose = require('mongoose');
const Usuario = require('./Usuario');

const publicacionSchema = new mongoose.Schema({
    id: { type: String, required: true, trim: false },
    userId: { type: String, required: true, trim: false },
    publicacionId: { type: String, required: true, trim: false },
    comentario: { type: String, required: true, trim: true },
    fechaComentario: { type: String, required: true, trim: true },
    valoracion: { type: Number, required: true, trim: false },
    usuario: { type: Usuario, required: true, trim: false },
}, { timestamps: true });

module.exports = mongoose.model('Comentario', comentarioSchema);