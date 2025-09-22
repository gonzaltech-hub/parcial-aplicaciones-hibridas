const Pelicula = require('../models/Pelicula');

exports.getAllPeliculas = async (req, res) => {
  try {
    const peliculas = await Pelicula.find().populate('director', 'nombre nacionalidad');
    res.status(200).json(peliculas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las películas", error: error.message });
  }
};

exports.getPeliculaById = async (req, res) => {
  try {
    const pelicula = await Pelicula.findById(req.params.id).populate('director');
    if (!pelicula) return res.status(404).json({ message: "Película no encontrada." });
    res.status(200).json(pelicula);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la película", error: error.message });
  }
};

exports.createPelicula = async (req, res) => {
    if (!req.body.titulo || !req.body.director) {
        return res.status(400).json({ message: "El título y el director son obligatorios." });
    }
    const nuevaPelicula = new Pelicula(req.body);
    try {
        const peliculaGuardada = await nuevaPelicula.save();
        res.status(201).json(peliculaGuardada);
    } catch (error) {
        res.status(400).json({ message: "Error al crear la película", error: error.message });
    }
};

exports.updatePelicula = async (req, res) => {
  try {
    const peliculaActualizada = await Pelicula.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!peliculaActualizada) return res.status(404).json({ message: "Película no encontrada." });
    res.status(200).json(peliculaActualizada);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar la película", error: error.message });
  }
};

exports.deletePelicula = async (req, res) => {
  try {
    const peliculaEliminada = await Pelicula.findByIdAndDelete(req.params.id);
    if (!peliculaEliminada) return res.status(404).json({ message: "Película no encontrada." });
    res.status(200).json({ message: "Película eliminada exitosamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la película", error: error.message });
  }
};

exports.buscarPeliculaPorTitulo = async (req, res) => {
    try {
        const termino = req.params.termino;
        const peliculas = await Pelicula.find({ titulo: new RegExp(termino, 'i') }).populate('director');
        if (peliculas.length === 0) return res.status(404).json({ message: "No se encontraron películas con ese título." });
        res.status(200).json(peliculas);
    } catch (error) {
        res.status(500).json({ message: "Error en la búsqueda", error: error.message });
    }
};