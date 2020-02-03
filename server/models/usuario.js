const mongoose = require('mongoose')
const Schema = mongoose.Schema
const _ = require('lodash')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken');

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

usuarioSchema.statics.login = function(args) {
  const { email, password } = args
  return this
    .findOne({ email })
    .then((usuarioDB, err) => {
      if (err) {
        return err
      }
      if (bcrypt.compareSync(password, usuarioDB.password)) {
        return jwt.sign(
          _.pick(usuarioDB, ['id', 'nombre', 'email']),
          'arcadia quest',
          { expiresIn: '1d' }
        )
      }
      else {
        throw new Error('Usuario o contraseña incorrectos')
      }
  })
}

module.exports = mongoose.model('Usuario', usuarioSchema)