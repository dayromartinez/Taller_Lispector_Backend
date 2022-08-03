const mongoose = require('mongoose');

const sesionSchema = new mongoose.Schema({
    titulo: { type: String, required: true, trim: true },
    descripcion: { type: String, required: true, trim: true },
    fecha: { type: String, required: true, trim: false },
    hora: { type: String, required: true, trim: false },
    direccionSesion: { type: String, required: true, trim: true },
    gestores: { type: String, required: false, trim: true, default: '' },
    ciclo: { type: String, required: true, trim: true },
    descripcionCiclo: { type: String, required: true, trim: true },
    imagenSesion: { type: String, required: true, trim: false },
}, { timestamps: true });

module.exports = mongoose.model('Sesion', sesionSchema);