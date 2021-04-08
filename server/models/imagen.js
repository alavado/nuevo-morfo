const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Marcador = require('./marcador')

const imagenSchema = new Schema({
  archivo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: false
  },
  esCorte: {
    type: Boolean,
    default: false
  },
  marcadores: [{
    type: Schema.Types.ObjectId,
    ref: 'Marcador'
  }],
  contenido: {
    type: Schema.Types.ObjectId,
    ref: 'Contenido'
  }
})

imagenSchema.statics.findMarcadores = function(id) {
  return Marcador.find({ imagen: id })
}

module.exports = mongoose.model('Imagen', imagenSchema)