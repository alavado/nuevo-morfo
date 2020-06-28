const mongoose = require('mongoose')
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../secret')
const ObjectId = mongoose.Types.ObjectId

const subseccionSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  seccion: {
    type: Schema.Types.ObjectId,
    ref: 'Seccion',
    default: null
  },
  subseccion: {
    type: Schema.Types.ObjectId,
    ref: 'Subseccion',
    default: null
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

subseccionSchema.statics.findContenidos = function(id, bearer) {
  const usuario = jwt.decode(bearer.split(' ')[1])
  const { grupos: gruposUsuario } = usuario
  return require('./contenido').find({
    subseccion: id,
    deleted: false,
    grupos: { $in: gruposUsuario }
  })
}

subseccionSchema.statics.findSubsecciones = function(subseccion) {
  return require('./subseccion').find({
    subseccion: mongoose.Types.ObjectId(subseccion)
  })
}

module.exports = mongoose.model('Subseccion', subseccionSchema)