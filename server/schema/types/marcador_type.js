const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql
const mongoose = require('mongoose')

const MarcadorType = new GraphQLObjectType({
  name: 'MarcadorType',
  fields: () => ({
    id: { type: GraphQLID },
    titulo: { type: GraphQLString },
    lat: { type: GraphQLString },
    lng: { type: GraphQLString }
  })
})

module.exports = MarcadorType
