const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLBoolean } = graphql
const mongoose = require('mongoose')
const Contenido = mongoose.model('Contenido')

const ContenidoType = new GraphQLObjectType({
  name: 'ContenidoType',
  fields: () => ({
    id: { type: GraphQLID },
    titulo: { type: GraphQLString },
    descripcion: { type: GraphQLString },
    tipo: { type: GraphQLString },
    imagenes: {
      type: new GraphQLList(require('./imagen_type')),
      resolve(parentValue) {
        return Contenido.findImagenes(parentValue.id)
      }
    },
    subseccion: {
      type: require('./subseccion_type'),
      resolve(parentValue) {
        return Contenido.findSubseccion(parentValue.id)
      }
    },
    grupos: {
      type: new GraphQLList(require('./grupo_type')),
      resolve(parentValue) {
        return Contenido.findGrupos(parentValue.id)
      }
    },
    deleted: { type: GraphQLBoolean }
  })
})

module.exports = ContenidoType
