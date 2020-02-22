const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongooseDelete = require('mongoose-delete')
const Imagen = require('./imagen')
const Grupo = require('./grupo')

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
  }],
  grupos: [{
    type: Schema.Types.ObjectId,
    ref: 'Grupo'
  }]
})

contenidoSchema.plugin(mongooseDelete)

contenidoSchema.statics.findSubseccion = function(id) {
  return this
    .findById(id)
    .populate('subseccion')
    .then(contenido => contenido.subseccion)
}

contenidoSchema.statics.findImagenes = function(id) {
  return Imagen.find({ contenido: id })
}

contenidoSchema.statics.findGrupos = function(id) {
  return this.findById(id).then(res => Grupo.find({ _id: { $in: res.grupos }}))
}

module.exports = mongoose.model('Contenido', contenidoSchema)