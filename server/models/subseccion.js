const mongoose = require('mongoose')
const Schema = mongoose.Schema

const subseccionSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  seccion: {
    type: Schema.Types.ObjectId,
    ref: 'Seccion'
  },
  contenidos: [{
    type: Schema.Types.ObjectId,
    ref: 'Contenido'
  }]
})

subseccionSchema.statics.findSeccion = function(id) {
  return this
    .findById(id)
    .populate('seccion')
    .then(subseccion => subseccion.seccion)
}

module.exports = mongoose.model('Subseccion', subseccionSchema)