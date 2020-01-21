const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SeccionSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  subsecciones: [{
    type: Schema.Types.ObjectId,
    ref: 'Subseccion'
  }]
})

SeccionSchema.statics.findSubsecciones = function(id) {
  return this.findById(id)
    .populate('subsecciones')
    .then(({nombre}) => nombre)
}

module.exports = mongoose.model('Seccion', SeccionSchema)