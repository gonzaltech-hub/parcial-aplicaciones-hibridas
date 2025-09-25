// --- Importaciones
const Pelicula = require('../models/Pelicula');

// --- Obtener Todas las Peliculas
exports.getAllPeliculas = async (req, res) => {
  try {
    // Reviso si en la URL vienen los parametros page y limit. Si no, uso valores por defecto
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    // Reviso si viene el parametro sortBy (ej:titulo_asc) y preparo el objeto de opciones para Mongoose
    const sortBy = req.query.sortBy;
    let sortOptions = {};
    if (sortBy) {
      const parts = sortBy.split('_');
      sortOptions[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }
    // Hago la consulta usando find() y le encadeno los metodos para que funcione todo lo de arriba
    // .populate() es para traer los datos del director y no solo su ID
    const peliculas = await Pelicula.find()
      .populate('director', 'nombre nacionalidad')
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);
    // Si despues de la busqueda no hay peliculas, doy un mensaje
    if (peliculas.length === 0) {
      return res.status(200).json({ message: "Todavia no hay películas en la base de datos." });
    }
    // Si todo esta ok, devuelvo las peliculas
    res.status(200).json(peliculas);
  } catch (error) {
    // Si algo falla, capturo el error y doy un mensaje
    res.status(500).json({ message: "Error al obtener las películas", error: error.message });
  }
};

// --- Obtener una Pelicula por su ID
exports.getPeliculaById = async (req, res) => {
  try {
    const pelicula = await Pelicula.findById(req.params.id).populate('director');
    // Si no se encuentra la pelicula, devuelvo un error 404.
    if (!pelicula) return res.status(404).json({ message: "Película no encontrada." });
    // Si se encuentra, la devuelvo
    res.status(200).json(pelicula);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la película", error: error.message });
  }
};

// --- Crear una Nueva Pelicula
exports.createPelicula = async (req, res) => {
    // Hago una validacion para los campos mas importantes antes de seguir
    if (!req.body.titulo || !req.body.director) {
        return res.status(400).json({ message: "El título y el director son obligatorios." });
    }
    // Creo una nueva instancia del modelo con los datos que vienen en el body de la peticion
    const nuevaPelicula = new Pelicula(req.body);
    try {
        // Intento guardar la nueva pelicula en la DB.
        const peliculaGuardada = await nuevaPelicula.save();
        // Si se guarda bien, devuelvo un estado 201 y el documento guardado
        res.status(201).json(peliculaGuardada);
    } catch (error) {
        // Si hay un error de validacion, Mongoose lo tira y yo lo capturo aca
        res.status(400).json({ message: "Error al crear la película", error: error.message });
    }
};

// --- Actualizar una Pelicula
// Busca una pelicula por ID y la actualiza con los datos nuevos que vienen en el body
// Nota: Profe por lo que vi Mongoose no corre las validaciones del modelo por defecto al usar findByIdAndUpdate. Por eso agregue la opción { runValidators: true } para 
// asegurar que no se puedan guardar datos incorrectos al actualizar una pelicula
exports.updatePelicula = async (req, res) => {
  try {
    const peliculaActualizada = await Pelicula.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!peliculaActualizada) return res.status(404).json({ message: "Película no encontrada." });
    res.status(200).json(peliculaActualizada);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar la película", error: error.message });
  }
};

// --- Eliminar una Pelicula
exports.deletePelicula = async (req, res) => {
  try {
    const peliculaEliminada = await Pelicula.findByIdAndDelete(req.params.id);
    if (!peliculaEliminada) return res.status(404).json({ message: "Película no encontrada." });
    // Si se elimina bien, devuelvo un mensaje de exito
    res.status(200).json({ message: "Película eliminada exitosamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la película", error: error.message });
  }
};

// --- Buscar Peliculas por titulo
exports.buscarPeliculaPorTitulo = async (req, res) => {
    try {
        const termino = req.params.termino;
        // Uso RegExp para hacer una busqueda
        // i para que no distinga entre mayusculas y minusculas
        const peliculas = await Pelicula.find({ titulo: new RegExp(termino, 'i') }).populate('director');
        if (peliculas.length === 0) return res.status(404).json({ message: "No se encontraron películas con ese título." });
        res.status(200).json(peliculas);
    } catch (error) {
        res.status(500).json({ message: "Error en la búsqueda", error: error.message });
    }
};