const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql
const mongoose = require('mongoose')

const ImagenType = new GraphQLObjectType({
  name: 'ImagenType',
  fields: () => ({
    id: { type: GraphQLID },
    titulo: { type: GraphQLString }
  })
})

module.exports = ImagenType
