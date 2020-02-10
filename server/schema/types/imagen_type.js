const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql
const mongoose = require('mongoose')
const Imagen = mongoose.model('Imagen')

const ImagenType = new GraphQLObjectType({
  name: 'ImagenType',
  fields: () => ({
    id: { type: GraphQLID },
    archivo: { type: GraphQLString },
    descripcion: { type: GraphQLString },
    marcadores: {
      type: new GraphQLList(require('./marcador_type')),
      resolve(parentValue) {
        return Imagen.findMarcadores(parentValue.id)
      }
    }
  })
})

module.exports = ImagenType
