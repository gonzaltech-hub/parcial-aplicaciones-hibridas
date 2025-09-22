const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const peliculasRoutes = require('./routes/peliculas');
const directoresRoutes = require('./routes/directores');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/peliculas', peliculasRoutes);
app.use('/api/directores', directoresRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});