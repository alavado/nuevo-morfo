const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imagenSchema = new Schema({
  titulo: {
    type: String,
    required: true
  },
  marcadores: [{
    type: Schema.Types.ObjectId,
    ref: 'Marcador'
  }]
})

module.exports = mongoose.model('Imagen', imagenSchema)