const graphql = require('graphql')
const mongoose = require('mongoose')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql

const UsuarioType = new GraphQLObjectType({
  name: 'UsuarioType',
  fields: () => ({
    id: { type: GraphQLID },
    nombre: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    token: { type:GraphQLString }
  })
})

module.exports = UsuarioType
