const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql
const mongoose = require('mongoose')

const MarcadorType = new GraphQLObjectType({
  name: 'MarcadorType',
  fields: () => ({
    id: { type: GraphQLID },
    titulo: { type: GraphQLString },
    posicion: { type: GraphQLString }
  })
})

module.exports = MarcadorType
