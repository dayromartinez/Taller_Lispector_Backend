const mongoose = require('mongoose');

const contenidoSchema = new mongoose.Schema({
    publicacionId: { type: String, required: true, trim: false },
    nombre: { type: String, required: true, trim: true, unique: true },
    texto: { type: String, required: true, trim: true },
    fechaLanzamiento: { type: String, required: false, trim: true },
    autores: { type: Array, required: true, trim: false },
    generos: { type: Array, required: false, trim: false },
    urlDocumento: { type: String, required: false, trim: true },
    urlImagen: { type: String, required: true, trim: true },
    comentarios: { type: Array, required: false, trim: false }
}, { timestamps: true });

module.exports = mongoose.model('Contenido', contenidoSchema);