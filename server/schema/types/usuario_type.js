const graphql = require('graphql')
const mongoose = require('mongoose')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql
const Usuario = mongoose.model('Usuario')

const UsuarioType = new GraphQLObjectType({
  name: 'UsuarioType',
  fields: () => ({
    id: { type: GraphQLID },
    nombre: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    token: { type: GraphQLString },
    grupos: {
      type: new GraphQLList(require('./grupo_type')),
      resolve(parentValue) {
        return Usuario.findGrupos(parentValue.id)
      }
    },
  })
})

module.exports = UsuarioType
