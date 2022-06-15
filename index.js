const express = require('express');
const {} = require('./repositories/mongoAdapter');
require('dotenv').config();
const userController = require('./controllers/user.controller');
const publicationController = require('./controllers/publicacion.controller');
const commentController = require('./controllers/comentario.controller');
const cors = require('cors');
const app = express();

//Middleware
app.use(express.json());
app.use(cors());
app.use('/auth', userController);
app.use('/publications', publicationController);
app.use('/comments', commentController);

// Routes
app.get('/', (req, res) => {
    res.send('¡Bienvenid@ a la API de Taller Lispector!');
});

app.listen(process.env.PORT || 9000, () => console.log('El servidor está corriendo en el puerto: ', process.env.PORT));