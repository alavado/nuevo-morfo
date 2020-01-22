const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contenidoSchema = new Schema({
  titulo: {
    type: String,
    required: true
  },
  descripcion: String,
  subseccion: {
    type: Schema.Types.ObjectId,
    ref: 'Subseccion'
  },
  imagenes: [{
    type: Schema.Types.ObjectId,
    ref: 'Imagen'
  }]
})

contenidoSchema.statics.findSubseccion = function(id) {
  return this
    .findById(id)
    .populate('subseccion')
    .then(contenido => contenido.subseccion)
}

module.exports = mongoose.model('Contenido', contenidoSchema)