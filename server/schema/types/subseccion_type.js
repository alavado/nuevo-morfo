const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql
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
    }
  })
})

module.exports = SubseccionType
