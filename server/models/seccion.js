const mongoose = require('mongoose')
const Schema = mongoose.Schema

const seccionSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  subsecciones: [{
    type: Schema.Types.ObjectId,
    ref: 'Subseccion'
  }]
})

seccionSchema.statics.findSubsecciones = function(id) {
  return require('./subseccion').find({ seccion: id })
}

module.exports = mongoose.model('Seccion', seccionSchema)