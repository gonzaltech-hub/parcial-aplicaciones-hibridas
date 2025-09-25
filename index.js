// --- Importaciones
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const chalk = require('chalk');
require('dotenv').config();

// --- Importaciones de Rutas
const peliculasRoutes = require('./routes/peliculas');
const directoresRoutes = require('./routes/directores');

// --- Inicializacion
const app = express();
const PORT = process.env.PORT || 3000;

// --- Conexion a la Base de Datos
mongoose.connect(process.env.URI_DB)
  .then(() => console.log(chalk.cyan('🔌 Conectado a la base de datos MongoDB')))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

// --- Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// --- Rutas de la API
app.use('/api/peliculas', peliculasRoutes);
app.use('/api/directores', directoresRoutes);

// --- Inicio del Servidor
app.listen(PORT, () => {
  console.log(chalk.yellow('----------------------------------------'));
  console.log(chalk.green.bold(' ✓ Servidor API de Películas - Online'));
  console.log(chalk.white(`   URL de Acceso: ${chalk.yellow(`http://localhost:${PORT}`)}`));
  console.log(chalk.yellow('----------------------------------------'));
});