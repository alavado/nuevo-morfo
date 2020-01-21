const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SubseccionSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  seccion: {
    type: Schema.Types.ObjectId,
    ref: 'Seccion'
  }
})

module.exports = mongoose.model('Subseccion', SubseccionSchema)