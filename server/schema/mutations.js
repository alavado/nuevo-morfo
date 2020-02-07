const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLFloat } = graphql
const mongoose = require('mongoose')
const Seccion = mongoose.model('Seccion')
const Subseccion = mongoose.model('Subseccion')
const Contenido = mongoose.model('Contenido')
const Imagen = mongoose.model('Imagen')
const Marcador = mongoose.model('Marcador')
const Usuario = mongoose.model('Usuario')
const SeccionType = require('./types/seccion_type')
const SubseccionType = require('./types/subseccion_type')
const ContenidoType = require('./types/contenido_type')
const ImagenType = require('./types/imagen_type')
const MarcadorType = require('./types/marcador_type')
const UsuarioType = require('./types/usuario_type')

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
    eliminarSubseccion: {
      type: SubseccionType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Subseccion.findOneAndDelete({ _id: id })
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
    eliminarContenido: {
      type: ContenidoType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Contenido.deleteById(id)
      }
    },
    restaurarContenido: {
      type: ContenidoType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Contenido.restore({ _id: id })
      }
    },
    agregarImagen: {
      type: ImagenType,
      args: {
        descripcion: { type: GraphQLString },
        contenido: { type: GraphQLID }
      },
      resolve(parentValue, args) {
        return (new Imagen(args)).save()
      }
    },
    agregarMarcador: {
      type: MarcadorType,
      args: {
        titulo: { type: GraphQLString },
        lat: { type: GraphQLFloat },
        lng: { type: GraphQLFloat },
        imagen: { type: GraphQLID }
      },
      resolve(parentValue, args) {
        return (new Marcador(args)).save()
      }
    },
    eliminarMarcador: {
      type: MarcadorType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Marcador.findOneAndDelete({ _id: id })
      }
    },
    agregarUsuario: {
      type: UsuarioType,
      args: {
        nombre: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return Usuario.agregar(args)
      }
    },
    login: {
      type: UsuarioType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return { token: Usuario.login(args) }
      }
    }
  }
})

module.exports = mutation
