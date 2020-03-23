const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLFloat, GraphQLList } = graphql
const mongoose = require('mongoose')
const Seccion = mongoose.model('Seccion')
const Subseccion = mongoose.model('Subseccion')
const Contenido = mongoose.model('Contenido')
const Imagen = mongoose.model('Imagen')
const Marcador = mongoose.model('Marcador')
const Usuario = mongoose.model('Usuario')
const Grupo = mongoose.model('Grupo')
const SeccionType = require('./types/seccion_type')
const SubseccionType = require('./types/subseccion_type')
const ContenidoType = require('./types/contenido_type')
const ImagenType = require('./types/imagen_type')
const MarcadorType = require('./types/marcador_type')
const UsuarioType = require('./types/usuario_type')
const GrupoType = require('./types/grupo_type')
const _ = require('lodash')

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
        subseccion: { type: GraphQLID },
        grupos: { type: new GraphQLList(GraphQLID) }
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
        contenido: { type: GraphQLID },
        archivo: { type: GraphQLString }
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
    editarMarcador: {
      type: MarcadorType,
      args: {
        id: { type: GraphQLID },
        titulo: { type: GraphQLString }
      },
      resolve(parentValue, { id, titulo }) {
        return Marcador.findByIdAndUpdate(id, { $set: { titulo } }, { new: true })
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
    editarUsuario: {
      type: UsuarioType,
      args: {
        id: { type: GraphQLID },
        nombre: { type: GraphQLString },
        email: { type: GraphQLString },
        grupos: { type: new GraphQLList(GraphQLID) }
      },
      resolve(parentValue, args) {
        return Usuario.actualizar(args.id, args)
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
    },
    agregarGrupo: {
      type: GrupoType,
      args: {
        nombre: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return (new Grupo(args)).save()
      }
    },
    agregarUsuarioAGrupo: {
      type: GrupoType,
      args: {
        usuario: { type: GraphQLID },
        grupo: { type: GraphQLID }
      },
      resolve(parentValue, { grupo, usuario }) {
        return Usuario
          .findByIdAndUpdate(usuario, { $addToSet: { grupos: grupo } })
          .then(u => Grupo.agregarUsuario(grupo, usuario))
      }
    },
    eliminarUsuarioDeGrupo: {
      type: GrupoType,
      args: {
        usuario: { type: GraphQLID },
        grupo: { type: GraphQLID }
      },
      resolve(parentValue, { grupo, usuario }) {
        return Usuario
          .findByIdAndUpdate(usuario, { $pull: { grupos: grupo } })
          .then(u => Grupo.eliminarUsuario(grupo, usuario))
      }
    }
  }
})

module.exports = mutation
