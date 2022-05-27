const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const usuarioRoutes = require('./routes/usuario.routes');
const cors = require('cors');
const app = express();

//Middleware
app.use(express.json());
app.use(cors());
app.use('/api', usuarioRoutes);

// Routes
app.get('/', (req, res) => {
    res.send('¡Bienvenid@ a la API de Taller Lispector!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.log(err));

app.listen(process.env.PORT || 9000, () => console.log('El servidor está corriendo en el puerto: ', process.env.PORT));
