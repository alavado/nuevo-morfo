const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql
const mongoose = require('mongoose')

const ContenidoType = new GraphQLObjectType({
  name: 'ContenidoType',
  fields: () => ({
    id: { type: GraphQLID },
    titulo: { type: GraphQLString },
    descripcion: { type: GraphQLString }
  })
})

module.exports = ContenidoType
