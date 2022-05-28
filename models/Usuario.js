const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    //id: { type: String, required: true, trim: false },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    imageUser: { type: String, required: false, trim: false },
    phone: { type: String, required: false, trim: true },
    role: {
        type: String,
        enum: {
            values: ['user', 'admin'],
            message: '{VALUE} no es un rol permitido'
        },
        default: 'user'
    },
    postalPublicationCode: { type: String, required: false, trim: true },
    password: { type: String, required: true, trim: true }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);