const mongoose = require('mongoose');
const directorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del director es obligatorio.'],
    trim: true
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

module.exports = mongoose.model('Director', directorSchema);