const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql
const mongoose = require('mongoose')
const Subseccion = mongoose.model('Subseccion')

const ContenidoType = new GraphQLObjectType({
  name: 'ContenidoType',
  fields: () => ({
    id: { type: GraphQLID },
    nombre: { type: GraphQLString }
  })
})

module.exports = ContenidoType
