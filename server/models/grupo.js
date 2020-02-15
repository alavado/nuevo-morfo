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
  }
})

grupoSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Grupo', grupoSchema)