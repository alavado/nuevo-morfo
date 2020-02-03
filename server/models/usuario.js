const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const saltRounds = 10

const usuarioSchema = new Schema({
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
    default: 'Usuario misterioso'
  }
})

usuarioSchema.statics.agregar = function(args) {
  const { nombre, email, password } = args
  return (new this({
    nombre,
    email,
    password: bcrypt.hashSync(password, saltRounds)
  })).save()
}

module.exports = mongoose.model('Usuario', usuarioSchema)