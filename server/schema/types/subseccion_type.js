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
      resolve(parentValue) {
        return Subseccion.findContenidos(parentValue.id)
      }
    }
  })
})

module.exports = SubseccionType
