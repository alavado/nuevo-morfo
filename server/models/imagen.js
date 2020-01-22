const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imagenSchema = new Schema({
  titulo: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Imagen', imagenSchema)