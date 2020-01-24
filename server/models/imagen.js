const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imagenSchema = new Schema({
  descripcion: {
    type: String,
    required: true
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