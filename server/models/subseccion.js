const mongoose = require('mongoose')
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../secret')

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

subseccionSchema.statics.findContenidos = function(id, bearer) {
  const usuario = jwt.decode(bearer.split(' ')[1])
  const { grupos: gruposUsuario } = usuario
  return require('./contenido').find({ subseccion: id, grupos: { $in: gruposUsuario } })
}

module.exports = mongoose.model('Subseccion', subseccionSchema)