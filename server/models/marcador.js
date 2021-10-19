const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongooseDelete = require('mongoose-delete')

const marcadorSchema = new Schema({
  titulo: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  },
  imagen: {
    type: Schema.Types.ObjectId,
    ref: 'Imagen'
  }
})

marcadorSchema.statics.findImagen = function(id) {
  return this.findById(id).then(res => Imagen.find({ _id: res.imagen }))
}

marcadorSchema.plugin(mongooseDelete)

module.exports = mongoose.model('Marcador', marcadorSchema)