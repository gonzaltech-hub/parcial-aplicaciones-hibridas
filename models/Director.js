// --- Importaciones
const mongoose = require('mongoose');

// --- Definicion del Esquema
const directorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del director es obligatorio.'], // El nombre no puede estar vacio
    trim: true // Borro espacios en blanco
  },
  nacionalidad: {
    type: String,
    required: [true, 'La nacionalidad es obligatoria.'],
    trim: true
  },
  fechaNacimiento: {
    type: Date
  }
});

// --- Exportacion
module.exports = mongoose.model('Director', directorSchema);