// --- Importaciones
const mongoose = require('mongoose');

// --- Definicion del Esquema
const peliculaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio.'], // Titulo obligatorio
    trim: true // Borro espacios en blanco
  },
  genero: {
    type: String,
    required: [true, 'El género es obligatorio.'],
    trim: true
  },
  añoEstreno: {
    type: Number,
    required: [true, 'El año de estreno es obligatorio.']
  },
  director: {
    type: mongoose.Schema.Types.ObjectId, // Defino que este campo es una referencia a otro documento
    ref: 'Director', // Le digo que la referencia es al modelo Director
    required: [true, 'El director es obligatorio.']
  },
  duracion: {
    type: Number,
    min: 1 // Duracion de al menos 1 minuto
  },
  calificacion: {
    type: Number,
    min: 1, // Calificacion del 1 al 10
    max: 10
  },
  portada: {
    type: String,
    default: 'https://picsum.photos/200/300' // URL placeholder
  }
});

// --- Exportacion
module.exports = mongoose.model('Pelicula', peliculaSchema);