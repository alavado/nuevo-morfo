const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema

const seccionSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true
  },
  subsecciones: [{
    type: Schema.Types.ObjectId,
    ref: 'Subseccion'
  }]
})

seccionSchema.plugin(uniqueValidator)

seccionSchema.statics.findSubsecciones = function(id) {
  return require('./subseccion').find({ seccion: id })
}

module.exports = mongoose.model('Seccion', seccionSchema)