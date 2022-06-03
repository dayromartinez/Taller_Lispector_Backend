const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
    nombre: { type: String, required: true, trim: true },
    descripcion: { type: String, required: true, trim: true },
    numeroPaginas: { type: String, required: false, trim: false },
    anoLanzamiento: { type: String, required: true, trim: true },
    autores: { type: Array, required: true, trim: false },
    generos: { type: Array, required: true, trim: false },
    urlDocumento: { type: String, required: true, trim: true },
    comentarios: { type: Array, required: false, trim: false },
    codigosPublicacion: { type: Array, required: true, trim: false },
}, { timestamps: true });

module.exports = mongoose.model('Publication', publicationSchema);