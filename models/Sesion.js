const mongoose = require('mongoose');

const sesionSchema = new mongoose.Schema({
    titulo: { type: String, required: true, trim: true },
    descripcion: { type: String, required: true, trim: true },
    fecha: { type: String, required: false, trim: false },
    hora: { type: String, required: false, trim: false },
    direccionSesion: { type: String, required: false, trim: true },
    gestores: { type: String, required: true, trim: true },
    ciclo: { type: String, required: true, trim: true },
    imagenSesion: { type: String, required: false, trim: false },
}, { timestamps: true });

module.exports = mongoose.model('Sesion', sesionSchema);