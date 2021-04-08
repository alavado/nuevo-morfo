const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLBoolean } = graphql
const mongoose = require('mongoose')
const Imagen = mongoose.model('Imagen')

const ImagenType = new GraphQLObjectType({
  name: 'ImagenType',
  fields: () => ({
    id: { type: GraphQLID },
    archivo: { type: GraphQLString },
    descripcion: { type: GraphQLString },
    esCorte: { type: GraphQLBoolean },
    marcadores: {
      type: new GraphQLList(require('./marcador_type')),
      resolve(parentValue) {
        return Imagen.findMarcadores(parentValue.id)
      }
    }
  })
})

module.exports = ImagenType
