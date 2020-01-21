const mongoose = require('mongoose')

const seccionSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model('Seccion', seccionSchema)