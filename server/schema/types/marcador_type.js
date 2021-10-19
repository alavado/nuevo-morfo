const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql
const mongoose = require('mongoose')
const Marcador = mongoose.model('Marcador')

const MarcadorType = new GraphQLObjectType({
  name: 'MarcadorType',
  fields: () => ({
    id: { type: GraphQLID },
    titulo: { type: GraphQLString },
    lat: { type: GraphQLString },
    lng: { type: GraphQLString },
    imagen: {
      type: require('./imagen_type'),
      resolve(parentValue) {
        return Marcador.findImagen(parentValue.id)
      }
    },
  })
})

module.exports = MarcadorType
