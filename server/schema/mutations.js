const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql
const mongoose = require('mongoose')
const Seccion = mongoose.model('Seccion')
const Subseccion = mongoose.model('Subseccion')
const SeccionType = require('./types/seccion_type')
const SubseccionType = require('./types/subseccion_type')

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    agregarSeccion: {
      type: SeccionType,
      args: {
        nombre: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return (new Seccion(args)).save()
      }
    },
    agregarSubseccion: {
      type: SubseccionType,
      args: {
        nombre: { type: GraphQLString },
        seccion: { type: GraphQLID }
      },
      resolve(parentValue, args) {
        return (new Subseccion(args)).save()
      }
    }
  }
})

module.exports = mutation
