const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql
const mongoose = require('mongoose')
const Seccion = mongoose.model('Seccion')
const Subseccion = mongoose.model('Subseccion')
const Contenido = mongoose.model('Contenido')
const Imagen = mongoose.model('Imagen')
const SeccionType = require('./types/seccion_type')
const SubseccionType = require('./types/subseccion_type')
const ContenidoType = require('./types/contenido_type')
const ImagenType = require('./types/imagen_type')

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    agregarSeccion: {
      type: SeccionType,
      args: {
        nombre: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return (new Seccion(args)).save()
      }
    },
    agregarSubseccion: {
      type: SubseccionType,
      args: {
        nombre: { type: GraphQLString },
        seccion: { type: GraphQLID }
      },
      resolve(parentValue, args) {
        return (new Subseccion(args)).save()
      }
    },
    agregarContenido: {
      type: ContenidoType,
      args: {
        titulo: { type: GraphQLString },
        descripcion: { type: GraphQLString },
        subseccion: { type: GraphQLID }
      },
      resolve(parentValue, args) {
        return (new Contenido(args)).save()
      }
    },
    agregarImagen: {
      type: ImagenType,
      args: {
        titulo: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return (new Imagen(args)).save()
      }
    }
  }
})

module.exports = mutation
