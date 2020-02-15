const graphql = require('graphql')
const mongoose = require('mongoose')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql
const Grupo = mongoose.model('Grupo')
const Usuario = mongoose.model('Usuario')

const GrupoType = new GraphQLObjectType({
  name: 'GrupoType',
  fields: () => ({
    id: { type: GraphQLID },
    nombre: { type: GraphQLString },
    _ts: { type: GraphQLString }
    // usuarios: {
    //   type: new GraphQLList(SubseccionType),
    //   resolve(parentValue) {
    //     return Seccion.findSubsecciones(parentValue.id)
    //   }
    // }
  })
})

module.exports = GrupoType
