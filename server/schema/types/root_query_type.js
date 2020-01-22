const mongoose = require('mongoose')
const graphql = require('graphql')
const { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLNonNull } = graphql
const SeccionType = require('./seccion_type')
const SubseccionType = require('./subseccion_type')
const Seccion = mongoose.model('Seccion')
const Subseccion = mongoose.model('Subseccion')

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    secciones: {
      type: new GraphQLList(SeccionType),
      resolve() {
        return Seccion.find({})
      }
    },
    seccion: {
      type: SeccionType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Seccion.findById(id)
      }
    },
    subseccion: {
      type: SubseccionType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Subseccion.findById(id)
      }
    }
  }
})

module.exports = RootQueryType
