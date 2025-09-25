// --- Importaciones
const Director = require('../models/Director');
const Pelicula = require('../models/Pelicula');

// --- Obtener todos los Directores
exports.getAllDirectores = async (req, res) => {
    try {
        const directores = await Director.find();
        if (directores.length === 0) {
            return res.status(200).json({ message: "Todavia no hay directores en la base de datos." });
        }
        res.status(200).json(directores);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los directores", error: error.message });
    }
};

// --- Crear un nuevo Director
// Agarra los datos que vienen y los usa para crear y guardar un nuevo director en la db
exports.createDirector = async (req, res) => {
    const nuevoDirector = new Director(req.body);
    try {
        const directorGuardado = await nuevoDirector.save();
        res.status(201).json(directorGuardado);
    } catch (error) {
        // Si Mongoose encuentra un error de validacion, lo capturo aca
        res.status(400).json({ message: "Error al crear el director", error: error.message });
    }
};

// --- Obtener Peliculas de un Director especifico
exports.getPeliculasPorDirector = async (req, res) => {
  try {
    const directorId = req.params.id;
    const peliculas = await Pelicula.find({ director: directorId });
    res.status(200).json(peliculas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las películas del director", error: error.message });
  }
};

// --- Borro Peliculas de un Director
exports.deleteDirector = async (req, res) => {
  try {
    const directorId = req.params.id;
    const peliculasAsociadas = await Pelicula.find({ director: directorId });
    // Si existe alguna pelicula, impide el borrado
    if (peliculasAsociadas.length > 0) {
      return res.status(400).json({ 
        message: "No se puede eliminar el director porque tiene películas asociadas. Elimine primero sus películas." 
      });
    }
    // Si no hay peliculas, elimina el director
    const directorEliminado = await Director.findByIdAndDelete(directorId);
    if (!directorEliminado) {
      return res.status(404).json({ message: "Director no encontrado." });
    }
    res.status(200).json({ message: "Director eliminado exitosamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el director", error: error.message });
  }
};