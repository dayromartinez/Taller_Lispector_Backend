const express = require('express');
const {} = require('./repositories/mongoAdapter');
require('dotenv').config();
const userController = require('./controllers/user.controller');
const publicationController = require('./controllers/publicacion.controller');
const cors = require('cors');
const app = express();

//Middleware
app.use(express.json());
app.use(cors());
app.use('/auth', userController);
app.use('/publications', publicationController);

// Routes
app.get('/', (req, res) => {
    res.send('¡Bienvenid@ a la API de Taller Lispector!');
});

app.listen(process.env.PORT || 9000, () => console.log('El servidor está corriendo en el puerto: ', process.env.PORT));