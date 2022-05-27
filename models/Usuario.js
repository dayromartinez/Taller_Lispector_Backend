const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    id: { type: String, required: true, trim: false },
    nombre: { type: String, required: true, trim: true },
    correo: { type: String, required: true, trim: true },
    imageUser: { type: String, required: false, trim: false },
    celular: { type: String, required: false, trim: true },
    rol: {
        type: String,
        enum: {
            values: ['usuario', 'admin'],
            message: '{VALUE} no es un rol permitido'
        }
    },
    codigoPublicacionPostales: { type: String, required: false, trim: true },
    contrasena: { type: String, required: true, trim: true }
}, { timestamps: true });

module.exports = mongoose.model('Usuario', usuarioSchema);