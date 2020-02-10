const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imagenSchema = new Schema({
  archivo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: false
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
  return require('./marcador').find({ imagen: id })
}

module.exports = mongoose.model('Imagen', imagenSchema)