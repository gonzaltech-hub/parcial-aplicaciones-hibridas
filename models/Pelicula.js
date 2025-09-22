const mongoose = require('mongoose');
const peliculaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio.'],
    trim: true
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Director',
    required: [true, 'El director es obligatorio.']
  },
  portada: {
    type: String,
    default: 'https://via.placeholder.com/150x220.png?text=Pelicula'
  }
});

module.exports = mongoose.model('Pelicula', peliculaSchema);