const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql
const mongoose = require('mongoose')
const Contenido = mongoose.model('Contenido')

const ContenidoType = new GraphQLObjectType({
  name: 'ContenidoType',
  fields: () => ({
    id: { type: GraphQLID },
    titulo: { type: GraphQLString },
    descripcion: { type: GraphQLString },
    imagenes: {
      type: new GraphQLList(require('./imagen_type')),
      resolve(parentValue) {
        return Contenido.findImagenes(parentValue.id)
      }
    }
  })
})

module.exports = ContenidoType
