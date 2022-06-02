const express = require('express');
const {} = require('./repositories/mongoAdapter');
require('dotenv').config();
const userControllers = require('./controllers/user.controller');
const cors = require('cors');
const app = express();

//Middleware
app.use(express.json());
app.use(cors());
app.use('/auth', userControllers);

// Routes
app.get('/', (req, res) => {
    res.send('¡Bienvenid@ a la API de Taller Lispector!');
});

app.listen(9000, () => console.log('El servidor está corriendo en el puerto: ', process.env.PORT));