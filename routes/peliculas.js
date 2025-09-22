const express = require('express');
const router = express.Router();
const peliculaController = require('../controllers/peliculaController');

router.get('/', peliculaController.getAllPeliculas);
router.get('/:id', peliculaController.getPeliculaById);
router.get('/buscar/:termino', peliculaController.buscarPeliculaPorTitulo);
router.post('/', peliculaController.createPelicula);
router.put('/:id', peliculaController.updatePelicula);
router.delete('/:id', peliculaController.deletePelicula);

module.exports = router;