const mongoose = require('mongoose')
const Schema = mongoose.Schema
const _ = require('lodash')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../secret')
const Grupo = require('./grupo')

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
  },
  grupos: [{
    type: Schema.Types.ObjectId,
    ref: 'Grupo'
  }]
})

usuarioSchema.statics.agregar = function(args) {
  const { nombre, email, password } = args
  return (new this({
    nombre,
    email,
    password: bcrypt.hashSync(password, saltRounds)
  })).save()
}

usuarioSchema.statics.loginUcampus = function(email) {
  return this
    .findOne({ email })
    .then((usuarioDB, err) => {
      if (err) {
        return err
      }
      return jwt.sign(
        _.pick(usuarioDB, ['id', 'nombre', 'email', 'grupos']),
        jwtSecret,
        { expiresIn: '2d' }
      )
    })
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
          _.pick(usuarioDB, ['id', 'nombre', 'email', 'grupos']),
          jwtSecret,
          { expiresIn: '2d' }
        )
      }
      else {
        throw new Error('Usuario o contraseña incorrectos')
      }
  })
}

usuarioSchema.statics.findGrupos = function(id) {
  return this.findById(id).then(res => Grupo.find({ _id: { $in: res.grupos }}))
}

usuarioSchema.statics.agregarGrupo = function(idUsuario, idGrupo) {
  return this.findByIdAndUpdate(idUsuario, { '$addToSet': { 'grupos': idGrupo } }, { new: true })
}

usuarioSchema.statics.actualizar = function(idUsuario, args) {
  const { id, nombre, email, grupos } = args
  return this.findById(id).then(usuario => {
    nombre && (usuario.nombre = nombre)
    email && (usuario.email = email)
    grupos && (usuario.grupos = grupos)
    return usuario.save()
  })
}

module.exports = mongoose.model('Usuario', usuarioSchema)
