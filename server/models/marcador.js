const mongoose = require('mongoose')
const Schema = mongoose.Schema

const marcadorSchema = new Schema({
  titulo: {
    type: String,
    required: true
  },
  posicion: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Marcador', marcadorSchema)