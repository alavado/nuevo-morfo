const mongoose = require('mongoose')
const graphql = require('graphql')
const { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLNonNull } = graphql
const SeccionType = require('./seccion_type')
const SubseccionType = require('./subseccion_type')
const ContenidoType = require('./contenido_type')
const UsuarioType = require('./usuario_type')
const GrupoType = require('./grupo_type')
const Seccion = mongoose.model('Seccion')
const Subseccion = mongoose.model('Subseccion')
const Contenido = mongoose.model('Contenido')
const Usuario = mongoose.model('Usuario')
const Grupo = mongoose.model('Grupo')

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    secciones: {
      type: new GraphQLList(SeccionType),
      resolve() {
        return Seccion.find({})
      }
    },
    seccion: {
      type: SeccionType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Seccion.findById(id)
      }
    },
    subseccion: {
      type: SubseccionType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Subseccion.findById(id)
      }
    },
    contenido: {
      type: ContenidoType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Contenido.findById(id)
      }
    },
    usuarios: {
      type: new GraphQLList(UsuarioType),
      resolve() {
        return Usuario.find({})
      }
    },
    grupos: {
      type: new GraphQLList(GrupoType),
      resolve() {
        return Grupo.find({})
      }
    },
    grupo: {
      type: GrupoType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Grupo.findById(id)
      }
    }
  }
})

module.exports = RootQueryType
