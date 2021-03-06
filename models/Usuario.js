const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    imageUser: { type: String, required: false, trim: false, default: '' },
    phone: { type: String, required: false, trim: true, default: '' },
    role: {
        type: String,
        enum: {
            values: ['user', 'admin'],
            message: '{VALUE} no es un rol permitido'
        },
        default: 'user'
    },
    comments: {type: Array, required: false, trim: false, default: []},
    publicationsCode: { type: Array, required: false, trim: false, default: [] },
    password: { type: String, required: true, trim: true },
    colorProfile: { type: Number, required: false, trim: false, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);