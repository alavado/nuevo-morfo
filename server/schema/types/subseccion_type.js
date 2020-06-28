const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql
const mongoose = require('mongoose')
const Subseccion = mongoose.model('Subseccion')

const SubseccionType = new GraphQLObjectType({
  name: 'SubseccionType',
  fields: () => ({
    id: { type: GraphQLID },
    nombre: { type: GraphQLString },
    seccion: {
      type: require('./seccion_type'),
      resolve(parentValue) {
        return Subseccion.findSeccion(parentValue.id)
      }
    },
    contenidos: {
      type: new GraphQLList(require('./contenido_type')),
      resolve(parentValue, args, req) {
        return Subseccion.findContenidos(parentValue.id, req.headers.authorization)
      }
    },
    subsecciones: {
      type: new GraphQLList(require('./subseccion_type')),
      resolve(parentValue, args, req) {
        return Subseccion.findSubsecciones(parentValue.id)
      }
    }
  })
})

module.exports = SubseccionType
