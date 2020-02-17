const graphql = require('graphql')
const mongoose = require('mongoose')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql
const Grupo = mongoose.model('Grupo')
const UsuarioType = require('./usuario_type')

const GrupoType = new GraphQLObjectType({
  name: 'GrupoType',
  fields: () => ({
    id: { type: GraphQLID },
    nombre: { type: GraphQLString },
    _ts: { type: GraphQLString },
    usuarios: {
      type: new GraphQLList(UsuarioType),
      resolve(parentValue) {
        return Grupo.findUsuarios(parentValue.id)
      }
    }
  })
})

module.exports = GrupoType
