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
  return require('./usuario').find({ grupo: id })
}

module.exports = mongoose.model('Grupo', grupoSchema)