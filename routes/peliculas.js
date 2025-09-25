// --- Importaciones
const express = require('express');
const router = express.Router();
const peliculaController = require('../controllers/peliculaController');

// --- Definicion de Rutas para Peliculas
router.get('/', peliculaController.getAllPeliculas);
router.get('/:id', peliculaController.getPeliculaById);
router.get('/buscar/:termino', peliculaController.buscarPeliculaPorTitulo);
router.post('/', peliculaController.createPelicula);
router.put('/:id', peliculaController.updatePelicula);
router.delete('/:id', peliculaController.deletePelicula);

// --- Exportacion
module.exports = router;