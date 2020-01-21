const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema

const roles = [
  'ROL_INVITADO',
  'ROL_ADMIN',
  'ROL_ESTUDIANTE'
]

const usuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    default: ''
  },
  carrera: {
    type: Schema.Types.ObjectId,
    ref: 'Carrera'
  },
  roles: [{
    type: String,
    enum: roles
  }]
})

usuarioSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Usuario', usuarioSchema)