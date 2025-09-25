// --- Importaciones
const express = require('express');
const router = express.Router();

// --- Traigo el controlador de directores
const directorController = require('../controllers/directorController');

// --- Definicion de Rutas para Directores
router.get('/', directorController.getAllDirectores);
router.post('/', directorController.createDirector);
router.get('/:id/peliculas', directorController.getPeliculasPorDirector);
router.delete('/:id', directorController.deleteDirector);

// --- Exportacion
module.exports = router;