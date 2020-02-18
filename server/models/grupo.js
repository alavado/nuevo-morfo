const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema

const grupoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true
  },
  _ts: {
    type : Date,
    default: Date.now
  },
  usuarios: [{
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  }]
})

grupoSchema.plugin(uniqueValidator)

grupoSchema.statics.findUsuarios = function(id) {
  return this.findById(id).then(res => require('./usuario').find({ _id: { $in: res.usuarios }}))
}

grupoSchema.statics.agregarUsuario = function(idGrupo, idUsuario) {
  return this.findByIdAndUpdate(idGrupo, { '$addToSet': { 'usuarios': idUsuario } }, { new: true })
}

module.exports = mongoose.model('Grupo', grupoSchema)